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
export const agroChemicalMiddleware = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'agro-chemical-company') {
    return res.status(401).send({ msg: 'you are not authorized to make this request' });
  }
  return next();
};
