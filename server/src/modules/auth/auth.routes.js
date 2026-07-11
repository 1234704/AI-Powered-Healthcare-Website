const express = require('express');
const router = express.Router();
const { signup, login } = require('./auth.controller');

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgot-password', authLimiter, forgotPassword);
router.patch('/reset-password/:token', authLimiter, resetPassword);


module.exports = router;