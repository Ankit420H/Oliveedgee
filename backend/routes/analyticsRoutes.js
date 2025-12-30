import express from 'express';
const router = express.Router();
import { getDashboardAnalytics, getSalesAnalytics } from '../services/analyticsService.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// All analytics routes require admin access
router.route('/dashboard').get(protect, admin, getDashboardAnalytics);
router.route('/sales').get(protect, admin, getSalesAnalytics);

export default router;
