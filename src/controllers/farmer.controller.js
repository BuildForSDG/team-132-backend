import { User } from '../models/User';
import { FarmerValidator, validateSignIn } from '../validator/farmer.validator';
import { FarmerService } from '../services/farmer.service';

export class FarmerController {
  static async register(req, res, next) {
    try {
      const { input } = req.body;

      const cleanInput = await FarmerValidator.validate(req.body, { abortEarly: false });

      const result = await FarmerService.add(cleanInput);
      if (!result) return res.status(400).send({ success: false, message: 'user with email already exists' });
      return res.status(200).send({
        success: !!result
      });
    } catch (error) {
      if (error.errors) {
        return res.status(422).send({ error: error.errors });
      }
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await User.find({});
      return res.status(200).send({ data: result });
    } catch (error) {
      return next(error);
    }
  }
  static async signIn(req, res, next) {
    try {
      const validInput = await validateSignIn.validate(req.body, { abortEarly: false });
      FarmerService.signIn(validInput, res);
    } catch (err) {
      console.error('Errors:', err.errors);
      return res.status(400).json({ errors: err.errors });
    }
  }
}
