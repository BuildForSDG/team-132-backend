import { Router } from 'express';
import isAuth from '../middleware/auth';
import { buyProduct } from '../controllers/buyProduct.controller';

const router = Router();

router.get('/cart-products', isAuth, buyProduct.getPdts);
router.post('/buy-cart', isAuth, buyProduct.myCart);
router.post('/add-to-cart', isAuth, buyProduct.addToCart);
router.post('/remove-from-cart', isAuth, buyProduct.removeFromCart);

export default router;
