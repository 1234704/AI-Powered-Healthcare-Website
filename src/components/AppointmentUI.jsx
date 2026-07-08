import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, CheckCircle, Activity, X, AlertCircle } from 'lucide-react';


const AppointmentUI = ({ doctor, onClose, onAppointmentConfirm }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    date: '',
    timeSlot: '',
    reason: ''
  });

 
  const [errors, setErrors] = useState({});

  const timeSlots = ['09:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSlotSelect = (slot) => {
    setFormData({ ...formData, timeSlot: slot });
    if (errors.timeSlot) {
      setErrors({ ...errors, timeSlot: '' });
    }
  };

  
  const validateForm = () => {
    let localErrors = {};
    
 
    if (formData.patientName.trim().length < 3) {
      localErrors.patientName = "Name must be at least 3 characters long.";
    }

    
    const phoneRegex = /^((\+92)|(0092))?[- ]?3\d{2}[- ]?\d{7}$|^03\d{2}[- ]?\d{7}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      localErrors.phone = "Enter a valid Pakistani mobile number (e.g., 03001234567).";
    }

    
    if (!formData.date) {
      localErrors.date = "Please select a valid consultation date.";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        localErrors.date = "Backdated appointments are not allowed.";
      }
    }

    
    if (!formData.timeSlot) {
      localErrors.timeSlot = "Please pick an available shift slot.";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    if (validateForm()) {
     
      if (onAppointmentConfirm) {
        onAppointmentConfirm({
          id: Date.now(), 
          doctorName: doctor?.name,
          specialization: doctor?.specialization,
          ...formData
        });
      }
      setStep(2);
    }
  };

  return (
    
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto"
    >
      
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 w-full max-w-lg relative z-10 my-auto"
      >
       
        <button 
          onClick={onClose} 
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all cursor-pointer z-20"
        >
          <X size={16} />
        </button>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            
            
            <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Activity size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Consultation Booking</h2>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  Securing slot with <span className="font-semibold text-blue-600">{doctor?.name}</span>
                </p>
              </div>
            </div>

           
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Patient Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 h-11 bg-slate-50 border ${errors.patientName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'} rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400`}
                    placeholder="Enter full name"
                  />
                </div>
                {errors.patientName && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {errors.patientName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 h-11 bg-slate-50 border ${errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'} rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400`}
                    placeholder="03001234567"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>
                )}
              </div>

             
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 h-11 bg-slate-50 border ${errors.date ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'} rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-600`}
                  />
                </div>
                {errors.date && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {errors.date}</p>
                )}
              </div>
            </div>

            
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Available Time Slots</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => handleSlotSelect(slot)}
                    className={`h-10 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                      formData.timeSlot === slot 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                        : errors.timeSlot 
                          ? 'bg-rose-50/30 text-slate-600 border-rose-300 hover:border-rose-400'
                          : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <Clock size={13} />
                    {slot}
                  </button>
                ))}
              </div>
              {errors.timeSlot && (
                <p className="text-[11px] text-rose-500 font-medium mt-2 flex items-center gap-1"><AlertCircle size={12} /> {errors.timeSlot}</p>
              )}
            </div>

            
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/10 transition-colors cursor-pointer"
            >
              Confirm Appointment
            </motion.button>
          </form>
        ) : (
          
          <div className="p-8 text-center flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4"
            >
              <CheckCircle size={32} className="fill-emerald-500/10" />
            </motion.div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h2>
            <p className="text-xs text-slate-500 mt-2 px-4 leading-relaxed">
              Thank you, <span className="font-bold text-slate-700">{formData.patientName}</span>. Your consultation with <span className="font-bold text-slate-700">{doctor?.name}</span> has been locked for <span className="font-bold text-blue-600">{formData.date}</span> at <span className="font-bold text-blue-600">{formData.timeSlot}</span>.
            </p>
            
            <button 
              onClick={onClose}
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl mt-6 transition-all cursor-pointer"
            >
              Done & Close Directory
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AppointmentUI;