import React, { useState } from 'react';
import AppointmentUI from './components/AppointmentUI';
import LabTestsUI from './components/LabTestsUI';
import { LayoutDashboard } from 'lucide-react';

function App() {
  // Manage state to switch between the two modules
  const [activeTab, setActiveTab] = useState('appointment');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Global Portal Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <LayoutDashboard />
              <span>Healthcare Portal</span>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <button 
                onClick={() => setActiveTab('appointment')}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md font-medium text-sm transition-colors ${
                  activeTab === 'appointment' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Book Appointment
              </button>
              <button 
                onClick={() => setActiveTab('lab')}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md font-medium text-sm transition-colors ${
                  activeTab === 'lab' 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Lab Tests
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dynamic Main Content Rendering */}
      <main className="flex-1">
        {activeTab === 'appointment' ? <AppointmentUI /> : <LabTestsUI />}
      </main>
    </div>
  );
}

export default App;