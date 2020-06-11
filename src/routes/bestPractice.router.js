import { Router } from 'express';
import createBestPractice from '../controllers/bestPractices.controller';

const router = Router();

router.post('/submit-form', createBestPractice);

export default router;
