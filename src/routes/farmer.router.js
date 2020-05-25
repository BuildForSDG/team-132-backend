import { Router } from 'express';
import { FarmerController } from '../controllers/farmer.controller';
import UssdController from '../controllers/ussdFarmerController';

const router = Router();
const { register, getAll } = FarmerController;
const { registerFarmer } = UssdController;

router.post('/register', register);

router.get('/all', getAll);
router.post('/create-ussd-account', registerFarmer);

export default router;
