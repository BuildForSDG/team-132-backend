import { Router } from 'express';
import farmerRouter from './farmer.router';
import adminRouter from './admin.router';

const router = Router();

router.use('/farmer', farmerRouter);
router.use('/farmers', farmerRouter);
router.use('/admin', adminRouter);

export default router;
