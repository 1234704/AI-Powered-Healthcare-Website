import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Users, ShieldCheck, Clock, Bell, User, ChevronDown } from 'lucide-react';
import DoctorCard from './components/DoctorCard';
import AppointmentUI from './components/AppointmentUI'; 

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

const categories = ["All", "Cardiologist", "Dermatologist", "Pediatrician", "Neurologist", "Gynecologist", "Orthopedic Surgeon", "Ophthalmologist", "Psychiatrist", "General Surgeon", "Oncologist", "ENT Specialist", "Endocrinologist"];

// Master Grid Parent Animation Configuration
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07 // Visual cascade thoda clear dikhane ke liye delay adjust kiya hai
    }
  }
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null); 

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || doctor.specialization === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Premium Top Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black tracking-wider text-sm shadow-md shadow-blue-500/20">
            CX
          </div>
          <span className="text-base font-bold text-slate-900 tracking-tight">CodeCelix <span className="text-blue-600 font-medium">Health</span></span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 text-slate-500 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200/60 flex items-center justify-center transition-all relative">
            <Bell size={18} />
            <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-2 right-2.5" />
          </button>
          <div className="h-6 w-[1px] bg-slate-200" />
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
        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Provider Directory</h1>
              <p className="text-sm text-slate-500 mt-1">Manage, review, and connect with clinical experts across various medical domains.</p>
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
              <p className="text-xl font-black text-slate-800 mt-0.5">{filteredDoctors.length} / 12 Available</p>
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

        {/* Fixed Flex Layout with solid Sidebar settings */}
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          
          {/* Locked Sidebar Control Panel */}
          <aside className="w-full lg:w-64 lg:min-w-64 lg:max-w-64 bg-white p-5 rounded-2xl shadow-xs border border-slate-200/60 lg:sticky lg:top-24 z-10 flex-shrink-0">
            <div className="flex items-center justify-between text-slate-800 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Control Panel</h2>
              </div>
              {(searchQuery || selectedCategory !== "All") && (
                <button onClick={resetFilters} className="text-[10px] font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer">
                  Reset
                </button>
              )}
            </div>
            
            <div className="space-y-5">
              {/* Active Search Bar */}
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name or degrees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 bg-slate-50 pl-10 pr-4 rounded-xl border border-slate-200/80 focus:outline-none focus:border-blue-500 focus:bg-white text-xs font-semibold text-slate-700 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Active Specialty Filter List */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">Filter by Specialty</label>
                <div className="space-y-1 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer relative overflow-hidden ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-transparent text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="relative z-10">{cat}</span>
                      {selectedCategory === cat && (
                        <motion.span 
                          layoutId="activeIndicator"
                          className="w-1.5 h-1.5 bg-white rounded-full relative z-10" 
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area - 3D Perspective Grid */}
          <main className="flex-1 w-full min-w-0" style={{ perspective: "1200px" }}>
            <motion.div 
              layout
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch auto-rows-fr"
              style={{ transformStyle: "preserve-3d" }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor)}
                    className="h-full"
                  >
                    <DoctorCard doc={doctor} />
                  </div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Edge-Case Empty Viewport */}
            <AnimatePresence>
              {filteredDoctors.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-64 bg-white rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 mt-2"
                >
                  <Search size={28} className="text-slate-300 mb-2" />
                  <h3 className="text-sm font-bold text-slate-800">No Specialists Found</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">We couldn't match any consultants with your search payload query.</p>
                  <button onClick={resetFilters} className="mt-4 text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-sm cursor-pointer">
                    Clear Search Filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

        </div>
      </div>

      {/* Appointment Popup Drawer Layer */}
      <AnimatePresence>
        {selectedDoctor && (
          <AppointmentUI doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;