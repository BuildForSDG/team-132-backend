import { Router } from 'express';
import farmerRouter from './farmer.router';

const router = Router();

router.use('/farmer', farmerRouter);
router.use('/farmers', farmerRouter);

export default router;
