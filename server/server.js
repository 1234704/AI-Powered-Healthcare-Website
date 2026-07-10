require('dotenv').config();
const config = require('./src/config/env'); 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db'); 
const errorHandler = require('./src/middleware/error.middleware'); 

// Route Imports
const authRoutes = require('./src/modules/auth/auth.routes');
const aiRoutes = require('./src/modules/ai/ai.routes');
const doctorRoutes = require('./src/modules/doctors/doctor.routes'); 
const appointmentRoutes = require('./src/modules/appointments/appointment.routes');
const pharmacyRoutes = require('./src/modules/pharmacy/pharmacy.routes');



const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes); 
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes); 
app.use('/api/pharmacy', pharmacyRoutes); 

// AI Symptom Checker Route
app.post('/api/ai/symptom-checker', (req, res) => {
    const { symptoms } = req.body;
    let suggestion = "General Physician";
    if (symptoms?.toLowerCase().includes("heart")) suggestion = "Cardiologist";
    res.json({ success: true, suggestion });
});

// Error Handling
app.use(errorHandler);

const PORT = config.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});