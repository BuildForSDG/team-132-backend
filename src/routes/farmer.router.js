import { Router } from 'express';
import { FarmerController } from '../controllers/farmer.controller';

const router = Router();
const { register, getAll, signIn } = FarmerController;

router.post('/register', register);
router.post('/sign-in', signIn);
router.get('/all', getAll);

export default router;
