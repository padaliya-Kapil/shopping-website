import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controller/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

import express from 'express';
const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;
