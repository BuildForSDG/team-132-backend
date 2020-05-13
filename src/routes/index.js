import { Router } from 'express';
import farmerRouter from './farmer.router';

const router = Router();

router.use('/farmer', farmerRouter);

export default router;
