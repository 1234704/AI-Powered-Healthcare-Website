const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Painkillers, Antibiotics
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  description: { type: String },
  image: { type: String, default: "https://via.placeholder.com/150" },
  prescriptionRequired: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);