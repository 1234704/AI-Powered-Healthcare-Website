const Medicine = require('./medicine.model');
const Cart = require('./cart.model');
const apiResponse = require('../../utils/apiResponse');

// 1. Get All Medicines (with search)
exports.getMedicines = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const medicines = await Medicine.find(filter);
    return apiResponse(res, 200, "Medicines fetched", medicines);
  } catch (error) { next(error); }
};

// 2. Add Item to Cart
exports.addToCart = async (req, res, next) => {
  try {
    const { medicineId, quantity } = req.body;
    const userId = req.user.id;

    // Check if medicine exists and has stock
    const medicine = await Medicine.findById(medicineId);
    if (!medicine || medicine.stock < quantity) {
      return apiResponse(res, 400, "Medicine unavailable or out of stock");
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [{ medicine: medicineId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(p => p.medicine.toString() === medicineId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ medicine: medicineId, quantity });
      }
      await cart.save();
    }

    return apiResponse(res, 200, "Item added to cart", cart);
  } catch (error) { next(error); }
};

// 3. Checkout (Process Order & Reduce Stock)
exports.checkout = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.medicine');
    if (!cart || cart.items.length === 0) return apiResponse(res, 400, "Cart is empty");

    // Logic to reduce stock in the Medicine collection
    for (const item of cart.items) {
      await Medicine.findByIdAndUpdate(item.medicine._id, {
        $inc: { stock: -item.quantity }
      });
    }

    // Clear cart after purchase
    cart.items = [];
    await cart.save();

    return apiResponse(res, 200, "Order placed successfully! Stock updated.");
  } catch (error) { next(error); }
};