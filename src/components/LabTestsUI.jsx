import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, ArrowRight, CheckCircle, Activity, HeartPulse, Dna, Droplets, ShieldPlus } from 'lucide-react';

const LabTestsUI = () => {
  const [bookingState, setBookingState] = useState(null); 
  const [selectedTest, setSelectedTest] = useState(null);

  const labTests = [
    { id: 1, name: 'Complete Blood Count (CBC)', category: 'Hematology', price: '$25.00', turnaround: '24 Hours', icon: <Droplets size={24} className="text-red-500" /> },
    { id: 2, name: 'Lipid Panel Profile', category: 'Cardiology', price: '$45.00', turnaround: '24 Hours', icon: <HeartPulse size={24} className="text-rose-500" /> },
    { id: 3, name: 'Comprehensive Metabolic Panel', category: 'General Health', price: '$60.00', turnaround: '48 Hours', icon: <Activity size={24} className="text-blue-500" /> },
    { id: 4, name: 'Thyroid Function (TSH)', category: 'Endocrinology', price: '$40.00', turnaround: '24 Hours', icon: <ShieldPlus size={24} className="text-indigo-500" /> },
    { id: 5, name: 'Genetic Risk Screening', category: 'Genetics', price: '$199.00', turnaround: '7-10 Days', icon: <Dna size={24} className="text-purple-500" /> },
    { id: 6, name: 'Vitamin D Deficiency Test', category: 'Wellness', price: '$35.00', turnaround: '48 Hours', icon: <FlaskConical size={24} className="text-amber-500" /> }
  ];

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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4 text-indigo-600 shadow-sm">
            <FlaskConical size={28} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Diagnostic Laboratory</h1>
          <p className="mt-2 text-slate-600">Browse available lab tests, view pricing, and book your diagnostics instantly.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!bookingState ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labTests.map((test, index) => (
                <motion.div key={test.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 p-6 flex flex-col justify-between transition-shadow duration-300">
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
            </motion.div>
          ) : (
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