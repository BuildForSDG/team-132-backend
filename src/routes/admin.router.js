import { Router } from 'express';
import InsuranceMiddleware from '../middleware/insuranceCompany';
import { AdminController } from '../controllers/adminController';
import isAuth from '../middleware/auth';
import accessControl from '../middleware/access';

const router = Router();

// handle insurance companies crud
router.post(
  '/register-insurance',
  isAuth,
  accessControl.restrictAccessTo('admin'),
  InsuranceMiddleware.uniqueInsuranceName,
  InsuranceMiddleware.uniquePhoneNumber,
  AdminController.registerInsurance
);

router.get('/companies', isAuth, accessControl.restrictAccessTo('admin'), AdminController.getAllInsuranceCompanies);
router.get('/companies/:id', isAuth, accessControl.restrictAccessTo('admin'), AdminController.getSingleCompany);
router.delete('/companies/:id', isAuth, accessControl.restrictAccessTo('admin'), AdminController.deleteCompany);

// handle all products operation here
router.get('/products', isAuth, accessControl.restrictAccessTo('admin'), AdminController.getAllUploadedProducts);
router.get('/products/:id', isAuth, accessControl.restrictAccessTo('admin'), AdminController.getSingleProduct);

router.get('/products/:id', isAuth, accessControl.restrictAccessTo('admin'), AdminController.deleteProduct);

export default router;
