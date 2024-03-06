import express from 'express';
import authRoutes from './Auth/auth.js';
import ordersRoutes from './Orders/orders.js';
import productsRoutes from './Products/products.js';
import presentationRoutes from './Presentation/presentation.js';
import isLoggedIn from '../middleware/auth/isLoggedIn.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/orders', ordersRoutes);
router.use('/products', isLoggedIn, productsRoutes);
router.use('/presentation', presentationRoutes);

export default router;
