import React from 'react';
import Doctor1 from '../assets/Doctor1.png';
import Doctor2 from '../assets/Doctor2.webp';
import Doctor3 from '../assets/Doctor3.webp';
import Doctor4 from '../assets/Doctor4.webp';

const doctors = [
  {
    id: 1,
    name: "Dr. Usman Malik",
    specialization: "Cardiologist",
    experience: "12 Years",
    rating: 4.9,
    image: Doctor1, 
    description: "Expert in heart diseases with 12+ years of experience"
  },
  {
    id: 2,
    name: "Dr. Ali Khan",
    specialization: "Neurologist",
    experience: "10 Years",
    rating: 4.8,
    image: Doctor2,
    description: "Specialist in brain and nervous system disorders"
  },
  {
    id: 3,
    name: "Dr. Fatima Noor",
    specialization: "Pediatrician",
    experience: "8 Years",
    rating: 4.9,
    image: Doctor3,
    description: "Caring for children with love and expertise"
  },
  {
    id: 4,
    name: "Dr. Sara Ali",
    specialization: "Orthopedic Surgeon",
    experience: "15 Years",
    rating: 4.7,
    image: Doctor4,
    description: "Expert in bone and joint surgeries"
  }
];

const FeaturedDoctors = () => {
  return (
    <section style={{
      padding: '60px 80px',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Section Heading */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1a237e',
          marginBottom: '10px'
        }}>
          👨‍⚕️ Featured Doctors
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Meet our experienced and highly qualified medical professionals
        </p>
      </div>

      {/* Doctors Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
            }}
          >
            {/* Doctor Image */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#eaf5e7',
              margin: '0 auto 15px',
              overflow: 'hidden',
              border: '3px solid #007bff'
            }}>
              <img 
                src={doctor.image}  // ← Ab imported image use hogi
                alt={doctor.name} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Doctor Name */}
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1a237e',
              marginBottom: '5px'
            }}>
              {doctor.name}
            </h3>

            {/* Specialization */}
            <p style={{
              color: '#007bff',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              {doctor.specialization}
            </p>

            {/* Experience */}
            <p style={{
              color: '#666',
              fontSize: '13px',
              marginBottom: '8px'
            }}>
              ⏱️ {doctor.experience} Experience
            </p>

            {/* Rating */}
            <p style={{
              color: '#ffc107',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              ⭐ {doctor.rating} / 5.0
            </p>

            {/* View Profile Button */}
            <button style={{
              padding: '8px 25px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#007bff';
            }}>
              View Profile →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDoctors;