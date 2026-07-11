const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById, upsertProfile } = require('./doctor.controller');
const { protect, restrictTo } = require('../../middleware/auth.middleware');

// Public Routes
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

// Protected Routes (Only Doctors can update their profile)
router.post('/profile', protect, restrictTo('doctor'), upsertProfile);

module.exports = router;