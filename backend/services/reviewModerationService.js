import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Get all reviews for moderation
// @route   GET /api/reviews/pending
// @access  Private/Admin
const getPendingReviews = asyncHandler(async (req, res) => {
    const products = await Product.find({ 'reviews.0': { $exists: true } })
        .populate('reviews.user', 'name email')
        .select('name reviews');

    // Flatten all reviews with product info
    const allReviews = [];
    products.forEach(product => {
        product.reviews.forEach(review => {
            allReviews.push({
                reviewId: review._id,
                productId: product._id,
                productName: product.name,
                rating: review.rating,
                comment: review.comment,
                user: review.user,
                createdAt: review.createdAt,
                helpfulVotes: review.helpfulVotes || 0
            });
        });
    });

    // Sort by newest first
    allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(allReviews);
});

// @desc    Delete a review (moderation)
// @route   DELETE /api/reviews/:productId/:reviewId
// @access  Private/Admin
const deleteReview = asyncHandler(async (req, res) => {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    const reviewIndex = product.reviews.findIndex(
        r => r._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
        res.status(404);
        throw new Error('Review not found');
    }

    product.reviews.splice(reviewIndex, 1);

    // Recalculate rating
    if (product.reviews.length > 0) {
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    } else {
        product.rating = 0;
    }

    product.numReviews = product.reviews.length;

    await product.save();

    res.json({ message: 'Review deleted successfully' });
});

// @desc    Vote review as helpful
// @route   POST /api/reviews/:productId/:reviewId/helpful
// @access  Private
const voteReviewHelpful = asyncHandler(async (req, res) => {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    const review = product.reviews.find(r => r._id.toString() === reviewId);

    if (!review) {
        res.status(404);
        throw new Error('Review not found');
    }

    // Initialize helpfulVotes if it doesn't exist
    if (!review.helpfulVotes) {
        review.helpfulVotes = 0;
    }

    review.helpfulVotes += 1;

    await product.save();

    res.json({ message: 'Vote recorded', helpfulVotes: review.helpfulVotes });
});

export { getPendingReviews, deleteReview, voteReviewHelpful };
