import { Router } from 'express';
import { FarmerController } from '../controllers/farmer.controller';
import UssdController from '../controllers/ussdFarmerController';
import isAuth from '../middleware/auth';
import accessControl from '../middleware/access';

const router = Router();
const { register, getAll, signIn } = FarmerController;
router.post('/register', register);
router.post('/sign-in', signIn);
const { registerFarmer } = UssdController;
router.get('/all', isAuth, accessControl.restrictAccessTo('admin'), getAll);
router.post('/create-ussd-account', registerFarmer);

export default router;
