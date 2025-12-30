import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Get shareable wishlist
// @route   GET /api/wishlist/share/:userId
// @access  Public
const getSharedWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId)
        .select('name wishlist')
        .populate({
            path: 'wishlist',
            select: 'name description price image rating numReviews brand category slug'
        });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({
        userName: user.name,
        wishlist: user.wishlist,
        itemCount: user.wishlist.length
    });
});

// @desc    Generate wishlist share link
// @route   POST /api/wishlist/generate-link
// @access  Private
const generateWishlistLink = asyncHandler(async (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const shareLink = `${frontendUrl}/wishlist/share/${req.user._id}`;

    res.json({
        shareLink,
        userId: req.user._id
    });
});

export { getSharedWishlist, generateWishlistLink };
