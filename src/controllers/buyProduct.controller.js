import Cart from '../models/cart';
import Product from '../models/Product';

export class buyProduct {
  static async getPdts(req, res, next) {
    try {
      const pdts = await Product.find({});
      return res.status(200).json({
        status: 'success',
        message: 'found products',
        data: pdts
      });
    } catch (error) {
      return next(error);
    }
  }

  static async myCart(req, res, next) {
    Cart.checkOut = true;
    await Cart.save();
    res.json({ products: `${Cart.items} bought` });
    next();
    return res.json({ message: "couldn't purchase" });
  }

  static async addToCart(req, res, next) {
    try {
      const pdt = await Product.findById(req.params.id);
      Cart.items.push(pdt);
      Cart.checkOut = false;
      await Cart.save();
      next();
      return res.json({ success: 'product bought' });
    } catch (e) {
      return res.status(404).json({
        status: false,
        Message: 'product noy found'
      });
    }
  }

  static async removeFromCart(req, res, next) {
    try {
      Cart.checkOut = false;
      const pdt = await Cart.items.findByIdAndDelete(req.params.id);
      if (pdt === false) {
        return res.json({
          Message: 'Product with this id does not exist'
        });
      }
      await pdt.remove();
      return res.json({ Message: 'Product deleted successfully' });
    } catch (error) {
      return next(error);
    }
  }
}
