const express = require('express');
const router = express.Router();
const { getMedicines, addToCart, checkout } = require('./pharmacy.controller');
const { protect } = require('../../middleware/auth.middleware');

// Public
router.get('/medicines', getMedicines);

// Protected (requires login)
router.post('/cart', protect, addToCart);
router.post('/checkout', protect, checkout);

module.exports = router;