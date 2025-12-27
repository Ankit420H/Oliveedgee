import express from 'express';
import { createOrder, verifyPayment, getRazorpayKey } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/key', protect, getRazorpayKey);

export default router;
