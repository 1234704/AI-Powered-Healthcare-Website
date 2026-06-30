import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, Phone, CheckCircle, Activity, CalendarDays } from 'lucide-react';

const AppointmentUI = () => {
  const [step, setStep] = useState(1);
  const [availableDates, setAvailableDates] = useState([]);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    date: '',
    timeSlot: '',
    reason: ''
  });

  const timeSlots = ['09:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  // Automatically generate the next 7 days when the component mounts
  useEffect(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    setAvailableDates(dates);
    
    // Auto-select the first available date by default
    if (dates.length > 0) {
      setFormData(prev => ({ ...prev, date: dates[0].fullDate }));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (dateStr) => {
    setFormData({ ...formData, date: dateStr, timeSlot: '' }); // Reset time slot when date changes
  };

  const handleSlotSelect = (slot) => {
    setFormData({ ...formData, timeSlot: slot });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Module */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
            <Activity size={28} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Book an Appointment</h1>
          <p className="mt-2 text-slate-600">Select your preferred date and time for the consultation.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
            >
              <form onSubmit={handleSubmit} className="p-8">
                
                {/* Patient Details */}
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
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
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
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Interactive Date Picker */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4 border-b pb-2">
                    <CalendarDays className="text-slate-800" size={20} />
                    <h2 className="text-lg font-semibold text-slate-800">Select Date & Time</h2>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-3">Available Dates</label>
                    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {availableDates.map((d) => {
                        const isSelected = formData.date === d.fullDate;
                        return (
                          <motion.button
                            type="button"
                            key={d.fullDate}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDateSelect(d.fullDate)}
                            className={`flex-shrink-0 flex flex-col items-center justify-center w-[72px] h-20 rounded-xl border transition-colors duration-200 ${
                              isSelected 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200' 
                                : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                          >
                            <span className={`text-[11px] font-medium mb-1 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>{d.dayName}</span>
                            <span className="text-xl font-bold">{d.dayNumber}</span>
                            <span className={`text-[10px] uppercase tracking-wider mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>{d.month}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Available Time Slots</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => handleSlotSelect(slot)}
                          className={`py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md ${
                            formData.timeSlot === slot 
                              ? 'bg-blue-600 text-white shadow-blue-200' 
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

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!formData.timeSlot || !formData.date}
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold shadow-lg shadow-blue-200 transition-colors"
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
              className="bg-white rounded-2xl shadow-xl p-10 text-center border border-slate-100"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} />
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
              <p className="text-slate-600 mb-6">
                Thank you, <span className="font-semibold">{formData.patientName}</span>. Your appointment is scheduled for <span className="font-semibold text-blue-600">{formData.date}</span> at <span className="font-semibold text-blue-600">{formData.timeSlot}</span>.
              </p>
              <button 
                onClick={() => setStep(1)}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors underline outline-none"
              >
                Book another appointment
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AppointmentUI;