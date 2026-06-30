import React from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Users, ShieldCheck, Clock, Bell, User, ChevronDown } from 'lucide-react';
import DoctorCard from './components/DoctorCard';

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Muhammad Ali",
    specialization: "Cardiologist",
    qualification: "MBBS, FCPS (Cardiology)",
    experience: "10 Years",
    rating: "4.9",
    location: "Core HQ - Central Clinic",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 2,
    name: "Dr. Amna Khan",
    specialization: "Dermatologist",
    qualification: "MBBS, MCPS (Dermatology)",
    experience: "8 Years",
    rating: "4.8",
    location: "Branch Office A - Skin Care",
    image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 3,
    name: "Dr. Zainab Ahmed",
    specialization: "Pediatrician",
    qualification: "MBBS, MD (Pediatrics)",
    experience: "12 Years",
    rating: "5.0",
    location: "Branch Office B - Kids Care",
    image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 4,
    name: "Dr. Bilal Siddiqui",
    specialization: "Neurologist",
    qualification: "MBBS, FCPS (Neurology)",
    experience: "15 Years",
    rating: "4.7",
    location: "Core HQ - Neuro Dept",
    image: "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 5,
    name: "Dr. Sana Malik",
    specialization: "Gynecologist",
    qualification: "MBBS, MCPS, FCPS",
    experience: "9 Years",
    rating: "4.9",
    location: "Data Center Allied Hospital",
    image: "https://images.pexels.com/photos/7578803/pexels-photo-7578803.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 6,
    name: "Dr. Hamza Yusuf",
    specialization: "Orthopedic Surgeon",
    qualification: "MBBS, MS (Orthopedics)",
    experience: "11 Years",
    rating: "4.6",
    location: "Branch Office A - Ortho",
    image: "https://images.pexels.com/photos/8460093/pexels-photo-8460093.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 7,
    name: "Dr. Asad Rizvi",
    specialization: "Ophthalmologist",
    qualification: "MBBS, FCPS (Ophthalmology)",
    experience: "14 Years",
    rating: "4.8",
    location: "Core HQ - Eye Care Wing",
    image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 8,
    name: "Dr. Ayesha Omar",
    specialization: "Psychiatrist",
    qualification: "MBBS, MD (Psychiatry)",
    experience: "7 Years",
    rating: "4.9",
    location: "Branch Office B - Mental Health",
    image: "https://images.pexels.com/photos/7108388/pexels-photo-7108388.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 9,
    name: "Dr. Tariq Mahmood",
    specialization: "General Surgeon",
    qualification: "MBBS, FRCS (London)",
    experience: "20 Years",
    rating: "5.0",
    location: "Core HQ - Main OT",
    image: "https://images.pexels.com/photos/6140660/pexels-photo-6140660.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 10,
    name: "Dr. Fatima Lodge",
    specialization: "Oncologist",
    qualification: "MBBS, FCPS, PhD",
    experience: "13 Years",
    rating: "4.7",
    location: "Data Center Oncology Lab",
    image: "https://images.pexels.com/photos/8442283/pexels-photo-8442283.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 11,
    name: "Dr. Usman Fazal",
    specialization: "ENT Specialist",
    qualification: "MBBS, DLO, FCPS",
    experience: "10 Years",
    rating: "4.5",
    location: "Branch Office A - ENT Clinic",
    image: "https://images.pexels.com/photos/8413401/pexels-photo-8413401.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 12,
    name: "Dr. Maryam Niaz",
    specialization: "Endocrinologist",
    qualification: "MBBS, MD (Endocrinology)",
    experience: "6 Years",
    rating: "4.6",
    location: "Branch Office B - Diabetes Care",
    image: "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const App = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Premium Top Navigation Bar (Clean & Professional) */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black tracking-wider text-sm shadow-md shadow-blue-500/20">
            CX
          </div>
          <span className="text-base font-bold text-slate-900 tracking-tight">CodeCelix <span className="text-blue-600 font-medium">Health</span></span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <button className="w-9 h-9 text-slate-500 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200/60 flex items-center justify-center transition-all relative">
            <Bell size={18} />
            <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-2 right-2.5" />
          </button>
          
          <div className="h-6 w-[1px] bg-slate-200" />
          
          {/* Clean Dropdown Account Control */}
          <div className="flex items-center gap-1.5 cursor-pointer group p-1 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="w-9 h-9 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 group-hover:border-blue-500 group-hover:text-blue-600 transition-colors">
              <User size={17} />
            </div>
            <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </div>
      </nav>

      {/* Main Container Dashboard Structure */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header Area */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Provider Directory
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage, review, and connect with clinical experts across various medical domains.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl h-fit shadow-xs">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Live System Nodes Active
            </div>
          </div>
        </motion.div>

        {/* Dynamic Analytics Stats Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users size={20} /></div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Consultants</p>
              <p className="text-xl font-black text-slate-800 mt-0.5">12 Specialists</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-500 rounded-xl"><ShieldCheck size={20} /></div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Tier Verified</p>
              <p className="text-xl font-black text-slate-800 mt-0.5">98% Satisfaction</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Clock size={20} /></div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Immediate Service</p>
              <p className="text-xl font-black text-slate-800 mt-0.5">24/7 Availability</p>
            </div>
          </div>
        </div>

        {/* Filter and Sidebar Layout */}
        <div className="lg:flex lg:gap-8">
          
          {/* Refined Filters Bar */}
          <aside className="w-full lg:w-1/4 bg-white p-5 rounded-2xl shadow-xs border border-slate-200/60 h-fit mb-6 lg:mb-0">
            <div className="flex items-center justify-between text-slate-800 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Control Panel</h2>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">Core</span>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                <div className="h-11 bg-slate-50 pl-10 pr-4 rounded-xl border border-slate-200/80 flex items-center text-xs text-slate-400 select-none">
                  Search query lookup... (Day 3)
                </div>
              </div>
              <div className="h-40 bg-slate-50/70 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-center px-4 text-xs font-medium text-slate-400/80 select-none">
                Interactive Multi-Specialty Filters Engine [Day 4 Workflow]
              </div>
            </div>
          </aside>

          {/* Core Content Doctor Cards Grid */}
          <main className="w-full lg:w-3/4">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {mockDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doc={doctor} />
              ))}
            </motion.div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default App;