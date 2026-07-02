import React from 'react';

const CTA = () => {
  return (
    <section style={{
      padding: '80px 80px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Heading */}
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#1a237e', 
          animation: 'fadeIn 1s ease-in-out'
        }}>
          Ready to Take Care of Your Health?
        </h2>

        {/* Sub-heading */}
        <p style={{
          fontSize: '18px',
          color: '#333', 
          marginBottom: '35px',
          lineHeight: '1.8'
        }}>
          Join thousands of satisfied patients who trust our platform 
          for their healthcare needs. Book your appointment today!
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {/* Primary Button - Book Appointment */}
          <button
            style={{
              padding: '15px 40px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,123,255,0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0056b3';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,123,255,0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0,123,255,0.3)';
            }}
          >
            📅 Book Appointment
          </button>

          {/* Secondary Button - Contact Us */}
          <button
            style={{
              padding: '15px 40px',
              backgroundColor: 'transparent',
              color: '#007bff', 
              border: '2px solid #007bff', 
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#007bff';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            📞 Contact Us
          </button>
        </div>

        {/* Small Text */}
        <p style={{
          fontSize: '14px',
          color: '#666', 
          marginTop: '30px',
          opacity: '0.8'
        }}>
          ⏰ 24/7 Support Available • Free Consultation • Secure & Confidential
        </p>
      </div>
    </section>
  );
};

export default CTA;