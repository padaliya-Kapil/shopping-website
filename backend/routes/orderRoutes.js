import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToBePaid,
  getOrders,
  updateOrderToDelivered
} from '../controller/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

import express from 'express';
const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToBePaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered )

export default router;
