import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, CheckCircle, Activity, X } from 'lucide-react';

const AppointmentUI = ({ doctor, onClose, onAppointmentConfirm }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    date: '',
    timeSlot: '',
    reason: ''
  });

  const timeSlots = ['09:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSlotSelect = (slot) => {
    setFormData({ ...formData, timeSlot: slot });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send the data back to App.jsx to update the global dashboard
    if (onAppointmentConfirm) {
      onAppointmentConfirm({
        ...formData,
        doctorName: doctor?.name || 'General Booking'
      });
    }
    
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="w-full max-w-3xl mx-auto relative my-auto">
        
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <X size={28} />
        </button>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
            >
              {/* Dynamic Header */}
              <div className="text-center pt-10 pb-6 px-8 bg-slate-50 border-b border-slate-100">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600 shadow-inner">
                  <Activity size={28} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Book an Appointment</h1>
                {doctor ? (
                  <p className="mt-2 text-slate-600">Scheduling a visit with <span className="font-semibold text-blue-600">{doctor.name}</span></p>
                ) : (
                  <p className="mt-2 text-slate-600">Schedule your visit with our healthcare professionals.</p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                
                {/* Patient Details Form */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Patient Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          name="patientName"
                          required
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Picker & Time Slots */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Schedule</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="date" 
                          name="date"
                          required
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-3">Available Time Slots</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => handleSlotSelect(slot)}
                          className={`py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                            formData.timeSlot === slot 
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-200/50' 
                              : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <Clock size={16} />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button with Hover Effects */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!formData.timeSlot}
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold shadow-lg shadow-blue-200 transition-colors cursor-pointer"
                >
                  Confirm Appointment
                </motion.button>
              </form>
            </motion.div>
          ) : (
            /* Confirmation Message Module */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-10 text-center border border-slate-100 max-w-md mx-auto"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
              >
                <CheckCircle size={40} />
              </motion.div>
              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Booking Confirmed!</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Thank you, <span className="font-semibold text-slate-800">{formData.patientName}</span>. Your appointment {doctor && `with ${doctor.name}`} is scheduled for <span className="font-semibold text-blue-600">{formData.date}</span> at <span className="font-semibold text-blue-600">{formData.timeSlot}</span>.
              </p>
              <button 
                onClick={onClose}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-md transition-colors cursor-pointer"
              >
                Return to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AppointmentUI;