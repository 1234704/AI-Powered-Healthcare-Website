import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, ArrowRight, CheckCircle, Activity, HeartPulse, Dna, Droplets, ShieldPlus, Search, SlidersHorizontal } from 'lucide-react';

const LabTestsUI = () => {
  const [bookingState, setBookingState] = useState(null); 
  const [selectedTest, setSelectedTest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Simulated Database
  const labTests = [
    { id: 1, name: 'Complete Blood Count (CBC)', category: 'Hematology', price: '$25.00', turnaround: '24 Hours', icon: <Droplets size={24} className="text-red-500" /> },
    { id: 2, name: 'Lipid Panel Profile', category: 'Cardiology', price: '$45.00', turnaround: '24 Hours', icon: <HeartPulse size={24} className="text-rose-500" /> },
    { id: 3, name: 'Comprehensive Metabolic Panel', category: 'General Health', price: '$60.00', turnaround: '48 Hours', icon: <Activity size={24} className="text-blue-500" /> },
    { id: 4, name: 'Thyroid Function (TSH)', category: 'Endocrinology', price: '$40.00', turnaround: '24 Hours', icon: <ShieldPlus size={24} className="text-indigo-500" /> },
    { id: 5, name: 'Genetic Risk Screening', category: 'Genetics', price: '$199.00', turnaround: '7-10 Days', icon: <Dna size={24} className="text-purple-500" /> },
    { id: 6, name: 'Vitamin D Deficiency Test', category: 'Wellness', price: '$35.00', turnaround: '48 Hours', icon: <FlaskConical size={24} className="text-amber-500" /> }
  ];

  // Dynamically extract unique categories for the filter buttons
  const categories = ['All', ...new Set(labTests.map(test => test.category))];

  // Filter logic combining search text and category selection
  const filteredTests = useMemo(() => {
    return labTests.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || test.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleBookTest = (test) => {
    setSelectedTest(test);
    setBookingState('success');
  };

  const handleReset = () => {
    setBookingState(null);
    setSelectedTest(null);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4 text-indigo-600 shadow-sm">
            <FlaskConical size={28} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Diagnostic Laboratory</h1>
          <p className="mt-2 text-slate-600">Browse available lab tests, view pricing, and book your diagnostics instantly.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!bookingState ? (
            <motion.div key="directory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              
              {/* Search and Filter Toolbar */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search lab tests..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0" style={{ scrollbarWidth: 'none' }}>
                  <SlidersHorizontal size={18} className="text-slate-400 flex-shrink-0 mr-1" />
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === category 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Grid */}
              {filteredTests.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredTests.map((test) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={test.id} 
                        whileHover={{ scale: 1.03 }} 
                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 p-6 flex flex-col justify-between transition-shadow duration-300"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                              {test.icon}
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                              {test.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{test.name}</h3>
                          <p className="text-sm text-slate-500 mb-4">Results in: {test.turnaround}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                          <div className="text-xl font-bold text-indigo-600">{test.price}</div>
                          <motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.95 }} onClick={() => handleBookTest(test)} className="flex items-center gap-1.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-md transition-colors">
                            Book Test <ArrowRight size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                /* Empty State / No Results */
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="inline-flex items-center justify-center p-4 bg-slate-100 rounded-full mb-4 text-slate-400">
                    <Search size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">No lab tests found</h3>
                  <p className="text-slate-500 mt-1">Try adjusting your search or filter criteria.</p>
                  <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-4 text-indigo-600 font-medium hover:underline">
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Success State */
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 text-center p-10">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle size={40} />
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Lab Test Booked!</h2>
              <p className="text-slate-600 mb-6">
                You have successfully requested the <span className="font-semibold text-indigo-600">{selectedTest?.name}</span>. 
                The total cost of <span className="font-semibold">{selectedTest?.price}</span> will be collected at the facility.
              </p>
              <button onClick={handleReset} className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold shadow-md transition-colors w-full sm:w-auto">
                Browse More Tests
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LabTestsUI;