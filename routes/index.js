import express from 'express';
import authRoutes from './Auth/auth.js';
import ordersRoutes from './Orders/orders.js';
import productsRoutes from './Products/products.js';
import presentationRoutes from './Presentation/presentation.js';
import isLoggedIn from '../middleware/auth/isLoggedIn.js';
import isAdmin from '../middleware/auth/isAdmin.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/orders', isAdmin, ordersRoutes);
router.use('/products', isLoggedIn, productsRoutes);
router.use('/presentation', isAdmin, presentationRoutes);

export default router;
