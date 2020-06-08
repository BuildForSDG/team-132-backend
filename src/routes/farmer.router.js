import { Router } from 'express';
import { FarmerController } from '../controllers/farmer.controller';
import UssdController from '../controllers/ussdFarmerController';
import FarmInputController from '../controllers/farmInput.controller';
import isAuth from '../middleware/auth';
import accessControl from '../middleware/access';

const router = Router();

const { postInput, updateFarmInput, getAllFarmInputs } = FarmInputController;
const { getSingleFarmInput } = FarmInputController;

const { register, getAllUsers, signIn } = FarmerController;

router.post('/register', register);
router.post('/sign-in', signIn);
const { registerFarmer } = UssdController;
router.get('/all', isAuth, accessControl.restrictAccessTo('admin'), getAllUsers);
router.get('/', isAuth, accessControl.restrictAccessTo('admin'), FarmerController.getAllFarmers);
router.get('/:id', isAuth, accessControl.restrictAccessTo('admin'), FarmerController.getSingleFarmer);
router.delete('/:id', isAuth, accessControl.restrictAccessTo('admin'), FarmerController.deleteFarmer);
router.post('/create-ussd-account', registerFarmer);
router.post('/farm-input', isAuth, accessControl.restrictAccessTo('agro-chemical-company'), postInput);
router.put('/farm-input/:id', isAuth, accessControl.restrictAccessTo('agro-chemical-company'), updateFarmInput);
router.get('/farm-input/', isAuth, getAllFarmInputs);
router.get('/farm-input/:id', isAuth, getSingleFarmInput);

export default router;
