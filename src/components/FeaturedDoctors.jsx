import React, { useState } from 'react';
import DoctorDetailsModal from './DoctorDetailsModal';

// Sample data (Replace this with your actual data if it's imported from elsewhere)
const doctors = [
  {
    id: 1,
    name: "Dr. Usman Malik",
    specialization: "Cardiologist",
    qualification: "MBBS, FCPS (Cardiology)",
    experience: "12 Years",
    rating: "4.9",
    location: "Islamabad Diagnostic Center",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Dr. Ali Khan",
    specialization: "Neurologist",
    qualification: "MBBS, MD (Neurology)",
    experience: "10 Years",
    rating: "4.8",
    location: "Shifa International Hospital",
    image: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    id: 3,
    name: "Dr. Fatima Noor",
    specialization: "Pediatrician",
    qualification: "MBBS, DCH",
    experience: "8 Years",
    rating: "4.9",
    location: "PIMS Hospital",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 4,
    name: "Dr. Sara Ali",
    specialization: "Orthopedic Surgeon",
    qualification: "MBBS, MS (Ortho)",
    experience: "15 Years",
    rating: "4.7",
    location: "Kulsum International Hospital",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export default function FeaturedDoctors() {
  // State to track which doctor is selected. If null, the modal is hidden.
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-2 flex items-center justify-center gap-2">
          👨‍⚕️ Featured Doctors
        </h2>
        <p className="text-gray-600">Meet our experienced and highly qualified medical professionals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            
            <div className="w-24 h-24 rounded-full border-4 border-blue-100 overflow-hidden mb-4">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            
            <h3 className="text-lg font-bold text-blue-900">{doctor.name}</h3>
            <p className="text-blue-600 font-medium text-sm mb-2">{doctor.specialization}</p>
            
            <div className="text-gray-500 text-xs mb-3 space-y-1">
              <p>⏱ {doctor.experience} Experience</p>
              <p className="text-amber-500 font-bold">⭐ {doctor.rating} / 5.0</p>
            </div>

            {/* THE FIX: We added onClick={...} to this button */}
            <button 
              onClick={() => setSelectedDoctor(doctor)}
              className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              View Profile →
            </button>
          </div>
        ))}
      </div>

     {/* Render the Modal ONLY if a doctor is selected */}
      {selectedDoctor && (
        <DoctorDetailsModal 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)}
          onBookAppointment={() => {
            // 1. Close the doctor profile modal
            setSelectedDoctor(null); 
            
            // 2. Find the Appointment UI button, scroll to it, and click it!
            setTimeout(() => {
              const bookBtn = document.getElementById('main-book-btn');
              if (bookBtn) {
                bookBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => bookBtn.click(), 400); // Wait for scroll to finish, then click
              }
            }, 100);
          }}
        />
      )}
    </div>
  );
}