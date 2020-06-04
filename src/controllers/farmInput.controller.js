import { FarmInput } from '../models/FarmInput';
import { farmInputValidator } from '../validator/farmInputValidator';

export default class FarmInputController {
  static async postInput(req, res) {
    const { role } = req.user;
    if (role !== 'agro-chemical-company') {
      return res.status(401).send({ msg: 'you are not authorized to make this request' });
    }
    try {
      const validInput = await farmInputValidator.validate(req.body, { abortEarly: false });
      const { id } = req.user;
      const farmInput = new FarmInput({ user: id, ...validInput });
      await farmInput.save();
      return res.status(200).json({ farmInput, success: true });
    } catch (err) {
      return res.status(400).json({ errors: err.errors, success: false });
    }
  }

  static async updateFarmInput(req, res) {
    const { role, id } = req.user;
    if (role !== 'agro-chemical-company') {
      return res.status(401).send({ msg: 'you are not authorized to make this request' });
    }
    try {
      const validInput = await farmInputValidator.validate(req.body, { abortEarly: false });
      const farmInputId = req.params.id;
      const farmInput = await FarmInput.findOne({ _id: farmInputId });
      if (id !== farmInput.user) return res.status(401).send({ msg: 'you are not authorized to make this request' });
      if (!farmInput) return res.status(400).json({ msg: 'product not found', success: false });

      const { name, price, description } = validInput;
      const { imageUrl, quantity } = validInput;
      farmInput.name = name;
      farmInput.price = price;
      farmInput.description = description;
      farmInput.imageUrl = imageUrl;
      farmInput.quantity = quantity;
      const result = await farmInput.save();
      return res.status(200).json({ result, success: true });
    } catch (err) {
      return res.status(400).json({ errors: err.errors, success: false });
    }
  }

  static async getAllFarmInputs(req, res) {
    try {
      const result = await FarmInput.find({}).populate('user', '-password').exec();
      return res.status(200).json({ data: result, success: true });
    } catch (err) {
      return res.status(400).json({ errors: err.errors, success: false });
    }
  }

  static async getSingleFarmInput(req, res) {
    try {
      const { id } = req.params;
      const result = await FarmInput.find({ _id: id }).populate('user', '-password').exec();
      return res.status(200).json({ data: result, success: true });
    } catch (err) {
      return res.status(400).json({ errors: err.errors, success: false });
    }
  }
}
