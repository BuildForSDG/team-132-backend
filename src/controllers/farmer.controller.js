import { User } from '../models/User';
import { FarmerValidator } from '../validator/farmer.validator';
import { FarmerService } from '../services/farmer.service';

export class FarmerController {
  static async register(req, res, next) {
    try {
      const { input } = req.body;
      const cleanInput = await FarmerValidator.validate(input, { abortEarly: false });

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
}
