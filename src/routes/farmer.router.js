import { Router } from 'express';
import { FarmerController } from '../controllers/farmer.controller';

const router = Router();
const { register, getAll } = FarmerController;

router.post('/register', register);
router.get('/all', getAll);

export default router;
