import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    updateUserAddresses,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    sendOtp,
    verifyOtp,
    getUserReviews,
} from '../controllers/userController.js';
import { getSharedWishlist, generateWishlistLink } from '../services/wishlistSharingService.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/profile/address').put(protect, updateUserAddresses);
router.get('/reviews', protect, getUserReviews);

// Wishlist sharing routes
router.get('/wishlist/share/:userId', getSharedWishlist);
router.post('/wishlist/generate-link', protect, generateWishlistLink);


router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;
