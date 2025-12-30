import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error('Invalid order status');
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    order.orderStatus = status;

    // Update timestamps
    if (status === 'shipped') {
        order.shippedAt = Date.now();
    } else if (status === 'delivered') {
        order.deliveredAt = Date.now();
        order.isDelivered = true;
    }

    const updatedOrder = await order.save();

    // TODO: Send email notification to customer about status change
    // await sendOrderStatusEmail(order.user, order._id, status);

    res.json(updatedOrder);
});

// @desc    Get order tracking info
// @route   GET /api/orders/:id/tracking
// @access  Private
const getOrderTracking = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        res.status(401);
        throw new Error('Not authorized to view this order');
    }

    const tracking = {
        orderId: order._id,
        orderStatus: order.orderStatus || 'pending',
        isPaid: order.isPaid,
        isDelivered: order.isDelivered,
        timeline: [
            {
                status: 'placed',
                timestamp: order.createdAt,
                completed: true,
                message: 'Order placed successfully'
            },
            {
                status: 'processing',
                timestamp: order.orderStatus === 'processing' || order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? order.updatedAt : null,
                completed: ['processing', 'shipped', 'delivered'].includes(order.orderStatus),
                message: 'Order is being processed'
            },
            {
                status: 'shipped',
                timestamp: order.shippedAt,
                completed: order.shippedAt != null,
                message: order.shippedAt ? 'Order has been shipped' : 'Preparing for shipment'
            },
            {
                status: 'delivered',
                timestamp: order.deliveredAt,
                completed: order.isDelivered,
                message: order.isDelivered ? 'Order delivered' : 'Out for delivery'
            }
        ],
        shippingAddress: order.shippingAddress,
        estimatedDelivery: order.estimatedDelivery || null
    };

    res.json(tracking);
});

export { updateOrderStatus, getOrderTracking };
