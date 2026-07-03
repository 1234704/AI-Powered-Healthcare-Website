import React from 'react';
import { motion } from 'framer-motion';
import { X, Star, Calendar, MapPin, Award, CheckCircle2, MessageSquare, ThumbsUp, Clock, CalendarDays } from 'lucide-react';

const getUniqueReviews = (doctorId) => {
  // ... (Pura reviewsPool object same rahega jo pichle step me diya tha)
  const reviewsPool = {
    1: [
      { name: "Kamran Shahzad", date: "2 days ago", rating: 5, comment: "Dr. Ali is exceptional. He explained my ECG report very clearly and changed my medication." },
      { name: "Zubair Ahmed", date: "1 week ago", rating: 4, comment: "Very professional cardiologist. Detailed consultation." }
    ],
    2: [
      { name: "Ayesha Siddiqua", date: "3 days ago", rating: 5, comment: "Best dermatologist in town! My skin allergy is completely gone." },
      { name: "Sana Bilal", date: "2 weeks ago", rating: 4.8, comment: "Very polite lady. She doesn't prescribe unnecessary medicines." }
    ],
    3: [
      { name: "Muhammad Rizwan", date: "Yesterday", rating: 5, comment: "Dr. Zainab deals children so gently. Excellent pediatrician." },
      { name: "Fatima Noor", date: "5 days ago", rating: 5, comment: "Highly satisfied with the kids treatment." }
    ],
    4: [
      { name: "Asif Raza", date: "3 days ago", rating: 4.5, comment: "Dr. Bilal's diagnostic skill for migraine is brilliant." },
      { name: "Zainab Malik", date: "1 week ago", rating: 5, comment: "Extremely detailed checkup for my mother." }
    ],
    5: [
      { name: "Mariam Yousuf", date: "4 days ago", rating: 5, comment: "Blessed to have her at Allied Hospital. Very cooperative." },
      { name: "Amber Jahangir", date: "1 month ago", rating: 4.8, comment: "Detailed discussion and very comforting nature." }
    ],
    6: [
      { name: "Tariq Jameel", date: "Yesterday", rating: 4.6, comment: "Knee pain treatment was spot on. I can walk comfortably now." },
      { name: "Bilal Butt", date: "1 week ago", rating: 4.5, comment: "Exercises bohot achi guide ki doctor saab ne." }
    ],
    7: [
      { name: "Haris Mehmood", date: "2 days ago", rating: 5, comment: "Laser eye checkup was fast and flawless." },
      { name: "Noreen Fatima", date: "3 weeks ago", rating: 4.7, comment: "Vision testing was precise. Custom glasses are comfortable." }
    ],
    8: [
      { name: "Waseem Akram", date: "4 days ago", rating: 5, comment: "Anxiety counseling sessions are working wonders for me." },
      { name: "Khadija Bibi", date: "1 week ago", rating: 4.8, comment: "Bohot sakoon se baat sunti hain doctor saab." }
    ],
    9: [
      { name: "Nabeel Qureshi", date: "Yesterday", rating: 5, comment: "Gallbladder surgery performed by Dr. Tariq was 100% successful." },
      { name: "Farhan Ali", date: "2 weeks ago", rating: 5, comment: "Legendary surgeon. His experience speaks through his work." }
    ],
    10: [
      { name: "Shazia Parveen", date: "3 days ago", rating: 4.7, comment: "Chemotherapy guidance session was deeply satisfying." },
      { name: "Hamza Abbasi", date: "1 month ago", rating: 5, comment: "Top class researcher and oncologist." }
    ],
    11: [
      { name: "Junaid Khan", date: "5 days ago", rating: 4.5, comment: "Throat infection chronic tha, inki medicine se aaraam aya ha." },
      { name: "Sadia Imran", date: "1 week ago", rating: 4.5, comment: "Ear wax cleaning session was totally painless." }
    ],
    12: [
      { name: "Uzair Baloch", date: "Yesterday", rating: 4.6, comment: "Diabetes management plan is practical. Sugar level normal ha." },
      { name: "Rida Farooq", date: "2 weeks ago", rating: 4.6, comment: "Thyroid diagnostic controls are very accurate." }
    ]
  };
  return reviewsPool[doctorId] || [
    { name: "Usman Ahmed", date: "3 days ago", rating: 4.9, comment: "Highly professional clinical counseling." }
  ];
};

const DoctorDetailsModal = ({ doctor, onClose, onBookAppointment }) => {
  if (!doctor) return null;

  const uniqueReviews = getUniqueReviews(doctor.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto custom-scrollbar">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 border border-slate-100 flex flex-col my-8"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full flex items-center justify-center transition-all cursor-pointer">
          <X size={16} />
        </button>

        {/* Header Hero */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 text-white flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-white/20 overflow-hidden shadow-xl flex-shrink-0 relative">
            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 space-y-2">
            <span className="bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-blue-500/30 inline-block">Verified Consultant</span>
            <h2 className="text-2xl font-black tracking-tight">{doctor.name}</h2>
            <p className="text-blue-300 font-bold text-xs">{doctor.qualification}</p>
            <div className="flex items-center gap-x-4 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {doctor.rating} Rating</span>
              <span className="flex items-center gap-1"><Award size={14} className="text-blue-400" /> {doctor.experience} Exp</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(100vh-320px)] overflow-y-auto custom-scrollbar bg-slate-50/50 flex-1">
          
          {/* Metadata Specialties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs flex items-start gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mt-0.5"><CheckCircle2 size={16} /></div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinical Specialty</h4>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{doctor.specialization}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs flex items-start gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg mt-0.5"><MapPin size={16} /></div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Node Location</h4>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{doctor.location}</p>
              </div>
            </div>
          </div>

          {/* ================= NEW: PREMIUM AVAILABILITY PANEL ================= */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-100 rounded-xl p-4 space-y-3 shadow-2xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
              <CalendarDays size={14} /> Weekly Shift Schedule
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              {/* Days Chips Layout */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">Available Days</span>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.availableDays?.map((day, idx) => (
                    <span key={idx} className="bg-white border border-blue-200 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-3xs">
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Time Slot Layout */}
              <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 flex items-center gap-2.5 shadow-3xs">
                <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg"><Clock size={15} /></div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Routine Timings</span>
                  <span className="text-xs font-bold text-slate-700 tracking-tight">{doctor.availableTime || "09:00 AM - 05:00 PM"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* =================================================================== */}

          {/* Clinical Work Bio */}
          <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar size={14} className="text-blue-600" /> Professional Overview
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Senior consultant providing specialized clinical healthcare routines. Accountable for diagnosing complex payloads, running regular clinical operations, and optimizing patient medical recovery strategies.
            </p>
          </div>

          {/* Reviews Panel */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MessageSquare size={14} className="text-blue-600" /> Patient Experiences ({uniqueReviews.length})
            </h3>
            <div className="space-y-3">
              {uniqueReviews.map((review, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-black text-slate-600 border border-slate-200">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{review.name}</h4>
                        <p className="text-[9px] text-slate-400 font-semibold">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-amber-600 font-black text-[10px]">
                      <Star size={10} className="fill-amber-500 text-amber-500" /> {review.rating}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium italic pl-9">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Fixed Action Tray */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Consultation Fee</span>
            <span className="text-base font-black text-slate-800">Rs. 2,500 <span className="text-xs font-medium text-slate-500">/ Session</span></span>
          </div>
          <button type="button" onClick={onBookAppointment} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 h-11 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer">
            <ThumbsUp size={14} /> Proceed to Appointment
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default DoctorDetailsModal;