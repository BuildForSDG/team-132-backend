import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  item: Array,
  checkOut: Boolean
});

export default mongoose.model('Cart', cartSchema);
