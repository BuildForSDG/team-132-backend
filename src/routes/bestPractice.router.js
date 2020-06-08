import { Router } from 'express';
import createBestPractice from '../controllers/bestPractices.controller';

const router = Router();

router.post('/submit-form', (req, res, next) => {
  createBestPractice({ ...req.body });
  res.json({ success: 'action posted' });
  next();
});

export default router;
