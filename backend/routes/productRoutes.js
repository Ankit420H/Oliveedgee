import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getRelatedProducts
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/:id/related', getRelatedProducts);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

router.route('/:id/reviews').post(protect, createProductReview);

export default router;
