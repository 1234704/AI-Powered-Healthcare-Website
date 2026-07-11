import { useState } from 'react';

export default function AppointmentUI() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', 
    phone: '',
    date: '2026-07-11',
    time: '09:00 AM'
  });

  // This single function handles closing the modal and resetting the form state
  const handleClose = () => {
    setShowModal(false);
    // Add a slight delay before resetting so the user doesn't see the form flash while closing
    setTimeout(() => setIsSubmitted(false), 300); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 mt-8 bg-white border border-gray-200 rounded-lg shadow-sm mx-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Book an Appointment</h2>
        <p className="text-gray-600">Schedule your visit with our healthcare professionals.</p>
      </div>
      
      <button 
        id="main-book-btn" /* Added ID here */
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        Book Now
      </button>

      {/* Modal Overlay Background */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          
          {/* Main Modal Container - The 'relative' class here is what fixes your close button! */}
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* THE FIXED CLOSE BUTTON */}
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors z-50"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Conditional Rendering: Form vs Success Screen */}
            {!isSubmitted ? (
              <div className="p-8">
                <div className="flex flex-col items-center mb-8">
                  <div className="bg-blue-50 p-3 rounded-full mb-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Book an Appointment</h3>
                  <p className="text-gray-500 mt-1">Schedule your visit with our healthcare professionals.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Patient Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          </div>
                          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="John Doe" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          </div>
                          <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="+1 (555) 000-0000" required />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Schedule</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                        <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Available Time Slots</label>
                        <select value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                          <option>09:00 AM</option>
                          <option>10:30 AM</option>
                          <option>01:00 PM</option>
                          <option>03:30 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-blue-900 text-white p-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors mt-4">
                    Confirm Appointment
                  </button>
                </form>
              </div>
            ) : (
              // Success Screen (Screenshot 2)
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Booking Confirmed!</h3>
                <p className="text-gray-600 text-lg mb-8 max-w-sm">
                  Thank you, <strong className="text-gray-900">{formData.name || 'shahryar'}</strong>. Your appointment is scheduled for <strong className="text-blue-600">{formData.date}</strong> at <strong className="text-blue-600">{formData.time}</strong>.
                </p>
                
                {/* The "Return to Dashboard" button acts as a secondary close button */}
                <button 
                  onClick={handleClose}
                  className="w-full max-w-xs bg-gray-900 text-white p-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}