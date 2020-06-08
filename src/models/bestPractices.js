import mongoose from 'mongoose';

const { Schema } = mongoose;

const bestPracticesSchema = new Schema({
  title: String,
  category: [String, String],
  author: String,
  company: String,
  seeds: [String, String, String, String]
});

export default mongoose.model('BestPractices', bestPracticesSchema);
