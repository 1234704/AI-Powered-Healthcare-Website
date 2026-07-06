import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, Phone, CheckCircle, Activity, CalendarDays, Sun, CloudSun, Moon, FileText, ClipboardList, CalendarPlus, ArrowLeft } from 'lucide-react';

const AppointmentUI = () => {
  const [step, setStep] = useState(1);
  const [availableDates, setAvailableDates] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    dob: '',
    gender: '',
    reason: '',
    date: '',
    timeSlot: ''
  });

  const timeSlotCategories = [
    {
      period: 'Morning',
      icon: <Sun size={16} className="text-amber-500" />,
      slots: [
        { time: '09:00 AM', available: true },
        { time: '09:30 AM', available: false },
        { time: '10:00 AM', available: true },
        { time: '11:30 AM', available: true },
      ]
    },
    {
      period: 'Afternoon',
      icon: <CloudSun size={16} className="text-orange-500" />,
      slots: [
        { time: '01:00 PM', available: false },
        { time: '02:00 PM', available: true },
        { time: '03:30 PM', available: true },
        { time: '04:15 PM', available: false },
      ]
    },
    {
      period: 'Evening',
      icon: <Moon size={16} className="text-indigo-500" />,
      slots: [
        { time: '05:00 PM', available: true },
        { time: '06:00 PM', available: true },
        { time: '07:30 PM', available: false },
      ]
    }
  ];

  useEffect(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        fullDisplay: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
      });
    }
    setAvailableDates(dates);
    
    if (dates.length > 0) {
      setFormData(prev => ({ ...prev, date: dates[0].fullDate }));
    }
  }, []);

  const validateForm = () => {
    const tempErrors = {};
    if (formData.patientName.trim().length < 3) tempErrors.patientName = "Full name must be at least 3 characters long.";
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s()-]/g, ''))) tempErrors.phone = "Please enter a valid phone number.";
    if (new Date(formData.dob) > new Date()) tempErrors.dob = "Date of birth cannot be a future date.";
    if (!formData.gender) tempErrors.gender = "Please select your gender.";
    if (formData.reason.trim().length < 10) tempErrors.reason = "Please describe your symptoms briefly (minimum 10 characters).";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleDateSelect = (dateStr) => setFormData({ ...formData, date: dateStr, timeSlot: '' });
  const handleSlotSelect = (slotTime) => setFormData({ ...formData, timeSlot: slotTime });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({ ...formData, patientName: '', phone: '', dob: '', gender: '', reason: '', timeSlot: '' });
  };

  const getDisplayDate = (dateStr) => {
    const target = availableDates.find(d => d.fullDate === dateStr);
    return target ? target.fullDisplay : dateStr;
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
                <Activity size={28} />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Book an Appointment</h1>
              <p className="mt-2 text-slate-600">Please provide patient details and schedule preferences.</p>
            </motion.div>
          )}
        </AnimatePresence>

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
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4 border-b pb-2">
                    <ClipboardList className="text-slate-800" size={20} />
                    <h2 className="text-lg font-semibold text-slate-800">Patient Intake Form</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" name="patientName" value={formData.patientName} required onChange={handleInputChange} className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.patientName ? 'border-red-400' : 'border-slate-200'}`} placeholder="John Doe" />
                      </div>
                      {errors.patientName && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.patientName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="tel" name="phone" value={formData.phone} required onChange={handleInputChange} className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.phone ? 'border-red-400' : 'border-slate-200'}`} placeholder="+1 (555) 000-0000" />
                      </div>
                      {errors.phone && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
                      <input type="date" name="dob" value={formData.dob} required onChange={handleInputChange} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.dob ? 'border-red-400' : 'border-slate-200'}`} />
                      {errors.dob && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.dob}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Gender Identity</label>
                      <select name="gender" value={formData.gender} required onChange={handleInputChange} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.gender ? 'border-red-400' : 'border-slate-200'}`}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                      {errors.gender && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.gender}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Reason for Visit / Symptoms</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
                      <textarea name="reason" rows="3" value={formData.reason} required onChange={handleInputChange} className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.reason ? 'border-red-400' : 'border-slate-200'}`} placeholder="Describe symptoms..."></textarea>
                    </div>
                    {errors.reason && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.reason}</p>}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4 border-b pb-2">
                    <CalendarDays className="text-slate-800" size={20} />
                    <h2 className="text-lg font-semibold text-slate-800">Select Date & Time</h2>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {availableDates.map((d) => {
                        const isSelected = formData.date === d.fullDate;
                        return (
                          <motion.button type="button" key={d.fullDate} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={() => handleDateSelect(d.fullDate)} className={`flex-shrink-0 flex flex-col items-center justify-center w-[72px] h-20 rounded-xl border transition-colors duration-200 ${isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'}`}>
                            <span className={`text-[11px] font-medium mb-1 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>{d.dayName}</span>
                            <span className="text-xl font-bold">{d.dayNumber}</span>
                            <span className={`text-[10px] uppercase tracking-wider mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>{d.month}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {timeSlotCategories.map((category, idx) => (
                      <div key={idx}>
                        <div className="flex items-center gap-2 mb-3">
                          {category.icon}
                          <h3 className="text-sm font-semibold text-slate-700">{category.period}</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {category.slots.map((slot, sIdx) => {
                            const isSelected = formData.timeSlot === slot.time;
                            return (
                              <button type="button" key={sIdx} disabled={!slot.available} onClick={() => handleSlotSelect(slot.time)} className={`py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${!slot.available ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-100' : isSelected ? 'bg-blue-600 text-white shadow-md border border-blue-600' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'}`}>
                                <Clock size={14} className={!slot.available ? 'opacity-50' : ''} />
                                {slot.time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" disabled={!formData.timeSlot || !formData.date} className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold shadow-lg shadow-blue-200 transition-colors mt-8">
                  Proceed to Confirmation
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
              <div className="bg-blue-600 p-8 text-center text-white">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }} className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle size={40} />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Appointment Confirmed</h2>
                <p className="text-blue-100 text-sm">A confirmation has been routed to your registered contact methods.</p>
              </div>

              <div className="p-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Appointment Summary</h3>
                <motion.div whileHover={{ scale: 1.01 }} className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 transition-shadow hover:shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                      <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Patient Name</span>
                      <span className="text-slate-900 font-medium">{formData.patientName}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Contact Number</span>
                      <span className="text-slate-900 font-medium">{formData.phone}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Scheduled Date</span>
                      <span className="text-slate-900 font-medium">{getDisplayDate(formData.date)}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Time Slot</span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 font-semibold text-sm">
                        <Clock size={14} />
                        {formData.timeSlot}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Primary Symptom / Reason</span>
                      <span className="text-slate-700 text-sm bg-white border border-slate-200 p-3 rounded-lg block mt-1">{formData.reason}</span>
                    </div>
                  </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold shadow-md flex items-center justify-center gap-2">
                    <CalendarPlus size={18} /> Add to Calendar
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleReset} className="flex-1 py-3 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold shadow-sm flex items-center justify-center gap-2">
                    <ArrowLeft size={18} /> Book Another
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppointmentUI;