import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { sendOrderConfirmationEmail, sendOrderDeliveredEmail } from '../utils/emailService.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        // 1. Validate Stock for ALL items before creating order
        // We need to fetch the fresh product data to check real-time stock
        const productIds = orderItems.map(item => item.product);
        const productsFromDb = await Product.find({ _id: { $in: productIds } });

        // Map for quick lookup
        const productMap = new Map();
        productsFromDb.forEach(p => productMap.set(p._id.toString(), p));

        for (const item of orderItems) {
            const product = productMap.get(item.product.toString());

            if (!product) {
                res.status(404);
                throw new Error(`Product not found: ${item.name}`);
            }

            if (product.countInStock < item.qty) {
                res.status(400);
                throw new Error(`Insufficient stock for ${item.name}. Available: ${product.countInStock}`);
            }
        }

        // 2. Create the Order
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        // 3. atomic Stock Deduction using bulkWrite
        // This runs AFTER order creation. If this fails, we might have an issue (edge case),
        // but typically we'd use a transaction. For MERN without replica sets, this is the standard approach.
        const bulkOps = orderItems.map(item => ({
            updateOne: {
                filter: { _id: item.product, countInStock: { $gte: item.qty } },
                update: { $inc: { countInStock: -item.qty } }
            }
        }));

        await Product.bulkWrite(bulkOps);

        // Fetch user email to send confirmation
        // Non-blocking: we don't await this to ensure UI responsiveness
        const user = await User.findById(req.user._id);
        if (user) {
            sendOrderConfirmationEmail(user.email, user.name, createdOrder)
                .catch(err => console.error('[EMAIL FAIL]', err));
        }

        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        if (order.user && order.user.email) {
            sendOrderDeliveredEmail(order.user.email, order.user.name, updatedOrder)
                .catch(err => console.error('[EMAIL FAIL] Delivery notification:', err));
        }

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get order analytics
// @route   GET /api/orders/analytics
// @access  Private/Admin
const getOrderAnalytics = asyncHandler(async (req, res) => {
    // Aggregate orders by date
    const orders = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalOrders: { $sum: 1 },
                totalSales: { $sum: "$totalPrice" }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    res.json(orders);
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        if (order.isDelivered) {
            res.status(400);
            throw new Error('Cannot cancel a delivered order');
        }

        order.isCancelled = true;
        order.cancelledAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Request order return
// @route   PUT /api/orders/:id/return
// @access  Private
const requestOrderReturn = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        if (!order.isDelivered) {
            res.status(400);
            throw new Error('Cannot return an order that has not been delivered');
        }

        if (order.isReturnRequested) {
            res.status(400);
            throw new Error('Return already requested for this order');
        }

        order.isReturnRequested = true;
        order.returnRequestedAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    getOrderAnalytics,
    cancelOrder,
    requestOrderReturn
};
