import React from 'react';

export default function CTA() {
  return (
    <section className="py-20 px-4 text-center bg-white">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Dots (Matching your screenshot) */}
        <div className="flex justify-center gap-2 mb-12">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
        </div>

        <h2 className="text-4xl font-bold text-blue-900 mb-6">
          Ready to Take Care of Your Health?
        </h2>
        
        <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Join thousands of satisfied patients who trust our platform for their healthcare needs. Book your
          appointment today!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
          
          {/* THE FIXED BOOK APPOINTMENT BUTTON */}
          <button 
            onClick={() => {
              const bookBtn = document.getElementById('main-book-btn');
              if (bookBtn) {
                bookBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => bookBtn.click(), 400);
              }
            }}
            className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/30 w-full sm:w-auto justify-center text-lg"
          >
            📅 Book Appointment
          </button>
          
          {/* Contact Us Button */}
          <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3.5 rounded-full font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center text-lg">
            📞 Contact Us
          </button>

        </div>
        
        <div className="text-sm text-gray-500 font-medium flex items-center justify-center gap-2">
          ⏰ 24/7 Support Available • Free Consultation • Secure & Confidential
        </div>
        
      </div>
    </section>
  );
}