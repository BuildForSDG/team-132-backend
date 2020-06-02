import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { User } from '../models/User';
import { FarmerValidator, validateSignIn } from '../validator/farmer.validator';
import { FarmerService } from '../services/farmer.service';

export class FarmerController {
  static async register(req, res, next) {
    try {
      const input = req.body;

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

  static async signIn(req, res) {
    try {
      const validInput = await validateSignIn.validate(req.body, { abortEarly: false });
      const { email, password } = validInput;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: [{ msg: 'Invalid credentials' }], success: false });
      }
      const isMatch = compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: [{ msg: 'Invalid credentials' }], success: false });
      }
      const payload = {
        user: {
          id: user.id
        }
      };

      const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 360000 });
      return res.status(200).json({ token, success: true });
    } catch (err) {
      return res.status(400).json({ errors: err.errors, success: false });
    }
  }
}
