import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getRelatedProducts,
} from '../controllers/productController.js';
import { searchProducts, getSearchSuggestions } from '../services/searchService.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Search routes (must be before /:id routes)
router.route('/search').get(searchProducts);
router.route('/suggest').get(getSearchSuggestions);

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id/related').get(getRelatedProducts);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

router.route('/:id/reviews').post(protect, createProductReview);

export default router;
