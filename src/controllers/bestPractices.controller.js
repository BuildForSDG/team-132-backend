import BestPractices from '../models/bestPractices';

const BestPractice = BestPractices;

export default function createBestPractice(req, res, next) {
  const agroTest = new BestPractice({ ...req.params });
  agroTest.save();
  res.json({ success: 'action posted' });
  next();
}
