import Razorpay from 'razorpay';
import crypto from 'crypto';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import Order from '../models/orderModel.js';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const { amount, currency = 'INR', receipt } = req.body;

    const options = {
        amount: amount * 100, // Razorpay works in smallest currency unit (paise)
        currency,
        receipt,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        // Update order status in database
        if (orderId) {
            const order = await Order.findById(orderId);
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    id: razorpay_payment_id,
                    status: 'success',
                    update_time: Date.now(),
                    email_address: order.user ? order.user.email : '', // Optional
                };
                await order.save();
            }
        }
        res.json({ status: 'success', message: 'Payment verified' });
    } else {
        res.status(400);
        throw new Error('Invalid signature');
    }
});

// @desc    Get Razorpay Key
// @route   GET /api/payment/key
// @access  Private
const getRazorpayKey = asyncHandler(async (req, res) => {
    res.json({ keyId: process.env.RAZORPAY_KEY_ID });
});


export { createOrder, verifyPayment, getRazorpayKey };
