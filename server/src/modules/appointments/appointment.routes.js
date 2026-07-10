const express = require('express');
const router = express.Router();
const { bookAppointment, getPatientAppointments, updateStatus } = require('./appointment.controller');
const { protect, restrictTo } = require('../../middleware/auth.middleware');

// All appointment routes require being logged in
router.use(protect);

// Patient routes
router.post('/book', restrictTo('patient'), bookAppointment);
router.get('/my-appointments', restrictTo('patient'), getPatientAppointments);

// Doctor/Admin routes
router.patch('/manage/:id', restrictTo('doctor', 'admin'), updateStatus);

module.exports = router;