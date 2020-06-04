import { verify } from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token authorization denied' });
  }
  try {
    const decoded = await verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: 'token is invalid' });
  }
};
