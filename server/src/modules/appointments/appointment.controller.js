const Appointment = require('./appointment.model');
const apiResponse = require('../../utils/apiResponse');

// 1. Book a New Appointment
exports.bookAppointment = async (req, res, next) => {
  try {
    const { doctor, appointmentDate, timeSlot, symptoms } = req.body;
    const patientId = req.user.id;

    // Check if the doctor is already booked for this specific date and time
    const existingAppointment = await Appointment.findOne({
      doctor,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      status: { $ne: 'cancelled' } 
    });

    if (existingAppointment) {
      return apiResponse(res, 400, "This time slot is already booked. Please choose another.");
    }

    const newAppointment = await Appointment.create({
      patient: patientId,
      doctor,
      appointmentDate,
      timeSlot,
      symptoms
    });

    return apiResponse(res, 201, "Appointment booked successfully", newAppointment);
  } catch (error) {
    next(error);
  }
};

// 2. Get My Appointments (For Patients)
exports.getPatientAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name avatar' } 
      })
      .sort({ appointmentDate: -1 });

    return apiResponse(res, 200, "Appointments fetched", appointments);
  } catch (error) {
    next(error);
  }
};

// 3. Update Appointment Status (For Doctors/Admins)
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) return apiResponse(res, 404, "Appointment not found");

    return apiResponse(res, 200, `Appointment ${status}`, appointment);
  } catch (error) {
    next(error);
  }
};