import { Router } from 'express';
import { FarmerController } from '../controllers/farmer.controller';
import UssdController from '../controllers/ussdFarmerController';
import FarmInputController from '../controllers/farmInput.controller';
import { auth } from '../middleware/auth';

const router = Router();
const { register, getAll, signIn } = FarmerController;
const {
  postInput, updateFarmInput, getAllFarmInputs, getSingleFarmInput
} = FarmInputController;
router.post('/register', register);
router.post('/sign-in', signIn);
const { registerFarmer } = UssdController;
router.get('/all', getAll);
router.post('/create-ussd-account', registerFarmer);
router.post('/farm-input', auth, postInput);
router.put('/farm-input/:id', auth, updateFarmInput);
router.get('/farm-input/', auth, getAllFarmInputs);
router.get('/farm-input/:id', auth, getSingleFarmInput);

export default router;
