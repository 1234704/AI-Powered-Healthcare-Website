const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  specialization: { 
    type: String, 
    required: true,
    trim: true 
  },
  experience: { 
    type: Number, 
    required: true 
  },
  bio: { 
    type: String, 
    maxLength: 500 
  },
  fees: { 
    type: Number, 
    required: true 
  },
  rating: { 
    type: Number, 
    default: 4.5 
  },
  availability: [
    {
      day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      slots: [String] 
    }
  ],
  isVerified: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);