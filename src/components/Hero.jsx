import React from 'react';
import healthcareImage from '../assets/healthcare.jpeg';

const Hero = () => {
  return (
    <section style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '60px 80px',
      background:'#ffffff',
      minHeight: '80vh'
    }}>
      {/* Left Side - Text Content */}
      <div style={{ flex: 1, paddingRight: '40px' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#1a237e',
          marginBottom: '20px'
        }}>
          Your Health, <br />Our Priority
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#333',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          Book appointments with top doctors, search medicines, 
          and access lab tests all in one place.
        </p>
        <button 
          // Added the onClick handler here
          onClick={() => {
            const bookBtn = document.getElementById('main-book-btn');
            if (bookBtn) {
              bookBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => bookBtn.click(), 400);
            }
          }}
          style={{
            padding: '14px 40px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Get Started →
        </button>
      </div>

      {/* Right Side - Image */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <img 
          src={healthcareImage} 
          alt="Healthcare" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '20px' }}
        />
      </div>
    </section>
  );
};

export default Hero;