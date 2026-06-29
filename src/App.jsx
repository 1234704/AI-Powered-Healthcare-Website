import React from 'react';
import AppointmentUI from './components/AppointmentUI';
import MedicineStore from './components/MedicineStore';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppointmentUI />
      <MedicineStore />
    </div>
  );
}

export default App;