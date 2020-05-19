import { User } from '../models/User';
import { jwt } from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'token is invalid' });
  }
};
