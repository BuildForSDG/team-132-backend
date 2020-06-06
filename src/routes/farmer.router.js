import { Router } from 'express';
import { FarmerController } from '../controllers/farmer.controller';
import UssdController from '../controllers/ussdFarmerController';
import FarmInputController from '../controllers/farmInput.controller';
import { auth, agroChemicalMiddleware } from '../middleware/auth';

const router = Router();
const { register, getAll, signIn } = FarmerController;
const { postInput, updateFarmInput, getAllFarmInputs } = FarmInputController;
const { getSingleFarmInput } = FarmInputController;
router.post('/register', register);
router.post('/sign-in', signIn);
const { registerFarmer } = UssdController;
router.get('/all', getAll);
router.post('/create-ussd-account', registerFarmer);
router.post('/farm-input', [auth, agroChemicalMiddleware], postInput);
router.put('/farm-input/:id', [auth, agroChemicalMiddleware], updateFarmInput);
router.get('/farm-input/', auth, getAllFarmInputs);
router.get('/farm-input/:id', auth, getSingleFarmInput);

export default router;
