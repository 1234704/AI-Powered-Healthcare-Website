import React from 'react';
import { motion } from 'framer-motion';
import { Star, Briefcase, GraduationCap, MapPin, CheckCircle } from 'lucide-react';

// Framer Motion variant for single card animation matching the cascade transition
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 110, damping: 16 } 
  }
};

const DoctorCard = ({ doc }) => {
  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: "0 12px 30px -10px rgb(0 0 0 / 0.08)" }}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:border-slate-200/80 h-full cursor-pointer select-none"
    >
      {/* Top Premium Accent Border on Hover */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Card Header: Avatar & Specialty Metadata */}
        <div className="flex items-start gap-4">
          <div className="relative overflow-hidden rounded-xl w-14 h-14 flex-shrink-0 border border-slate-100 bg-slate-50">
            <img 
              src={doc.image} 
              alt={doc.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-slate-800 text-sm tracking-tight truncate group-hover:text-blue-600 transition-colors duration-200">
                {doc.name}
              </h3>
              <CheckCircle size={13} className="text-blue-500 flex-shrink-0 fill-blue-500/10" />
            </div>
            <p className="text-[11px] font-bold text-blue-600 bg-blue-50/70 px-2 py-0.5 rounded-md inline-block mt-1 tracking-wide uppercase">
              {doc.specialization}
            </p>
          </div>
        </div>

        {/* Core Practitioner Bio Section */}
        <div className="mt-5 pt-4 border-t border-slate-100/80 space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <GraduationCap size={15} className="text-slate-400 flex-shrink-0" />
            <span className="truncate text-slate-500"><strong>Degree:</strong> {doc.qualification}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={15} className="text-slate-400 flex-shrink-0" />
            <span className="text-slate-500"><strong>Experience:</strong> {doc.experience}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-slate-400 flex-shrink-0" />
            <span className="text-slate-500 truncate font-medium">{doc.location}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Live System Rating & Action Trigger */}
      <div className="mt-5 pt-3 border-t border-slate-100/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-amber-50/80 px-2 py-1 rounded-lg border border-amber-100/50">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-amber-700">{doc.rating}</span>
        </div>
        
        {/* Changed to div so it visualizes as a button but lets the outer motion.div handle the logic smoothly without blockages */}
        <div 
          className="flex-1 bg-slate-900 text-white py-2 px-3 rounded-xl font-semibold text-xs shadow-xs group-hover:bg-blue-600 transition-colors duration-200 text-center"
        >
          Book Appointment
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;