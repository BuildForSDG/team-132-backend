import { Router } from 'express';
import farmerRouter from './farmer.router';
import bestPracticeRouter from './bestPractice.router';
import buyProductRouter from './buyProduct.router';
import adminRouter from './admin.router';


const router = Router();

router.use('/farmer', farmerRouter);
router.use('/farmers', farmerRouter);
router.use('/agro-chemical', bestPracticeRouter);
router.use('/buy-product', buyProductRouter);
router.use('/admin', adminRouter);

export default router;
