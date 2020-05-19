import { hash, compare } from 'bcrypt';
import { User } from '../models/User';

import jwt from 'jsonwebtoken';

export class FarmerService {
  static async add(input) {
    try {
      const passPromise = hash(input.password, 10);
      const findUserPromise = this.findByEmail(input.email);
      const [password, user] = await Promise.all([passPromise, findUserPromise]);
      input.password = password;
      if (user) return false;
      return User.create(input);
    } catch (error) {
      return new Error(error);
    }
  }

  static async findByEmail(email) {
    const user = User.findOne({ email });
    return user;
  }
  static async signIn(input, res) {
    const { email, password } = input;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: [{ msg: 'Invalid credentials' }] });
      }
      const isMatch = compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: [{ msg: 'Invalid credentials' }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
}
