import BestPractices from '../models/bestPractices';

const BestPractice = BestPractices;

export default function createBestPractice(title, category, author, company, seeds) {
  const agroTest = new BestPractice({
    title,
    category,
    author,
    company,
    seeds
  });
  agroTest.save();
}
