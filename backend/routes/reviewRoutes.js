import express from 'express';
const router = express.Router();
import {
    getPendingReviews,
    deleteReview,
    voteReviewHelpful
} from '../services/reviewModerationService.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Admin routes
router.route('/pending').get(protect, admin, getPendingReviews);
router.route('/:productId/:reviewId').delete(protect, admin, deleteReview);

// User routes
router.route('/:productId/:reviewId/helpful').post(protect, voteReviewHelpful);

export default router;
