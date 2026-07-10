const Doctor = require('./doctor.model');
const apiResponse = require('../../utils/apiResponse');

// 1. Get all doctors with Search and Filter
exports.getDoctors = async (req, res, next) => {
  try {
    const { specialization, search } = req.query;
    let query = {};

    // Filter by specialization (e.g., Cardiology)
    if (specialization) {
      query.specialization = { $regex: specialization, $options: 'i' };
    }

    // Search by specialization or link to user search logic
    // For a simple version, we find doctors and populate user data
    let doctors = await Doctor.find(query).populate('user', 'name avatar');

    // If search term exists, filter the populated user names
    if (search) {
      doctors = doctors.filter(doc => 
        doc.user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return apiResponse(res, 200, "Doctors fetched successfully", doctors);
  } catch (error) {
    next(error);
  }
};

// 2. Get Single Doctor Details
exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user', 'name email avatar phone');
    if (!doctor) return apiResponse(res, 404, "Doctor not found");

    return apiResponse(res, 200, "Doctor details fetched", doctor);
  } catch (error) {
    next(error);
  }
};

// 3. Create or Update Doctor Profile
exports.upsertProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { specialization, experience, bio, fees, availability } = req.body;

    const profileData = {
      user: userId,
      specialization,
      experience,
      bio,
      fees,
      availability
    };

    const profile = await Doctor.findOneAndUpdate(
      { user: userId },
      profileData,
      { new: true, upsert: true }
    );

    return apiResponse(res, 201, "Doctor profile updated successfully", profile);
  } catch (error) {
    next(error);
  }
};