import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    getOrderAnalytics,
    updateOrderToDelivered,
    cancelOrder,
    requestOrderReturn
} from '../controllers/orderController.js';
import { updateOrderStatus, getOrderTracking } from '../services/orderTrackingService.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.get('/analytics', protect, admin, getOrderAnalytics);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id/status').put(protect, admin, updateOrderStatus);
router.route('/:id/tracking').get(protect, getOrderTracking);
router.route('/:id/cancel').put(protect, cancelOrder);
router.route('/:id/return').put(protect, requestOrderReturn);

export default router;
