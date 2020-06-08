import { Router } from 'express';
import farmerRouter from './farmer.router';
import bestPracticeRouter from './bestPractice.router';

const router = Router();

router.use('/farmer', farmerRouter);
router.use('/farmers', farmerRouter);
router.use('/agro-chemical', bestPracticeRouter);

export default router;
