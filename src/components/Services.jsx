import React from 'react';

const services = [
  {
    id: 1,
    icon: "📅",
    title: "Book Appointment",
    description: "Schedule appointments with top doctors at your convenience"
  },
  {
    id: 2,
    icon: "💊",
    title: "Search Medicines",
    description: "Find and order medicines online with best prices"
  },
  {
    id: 3,
    icon: "🔬",
    title: "Lab Tests",
    description: "Book lab tests and get results online quickly"
  },
  {
    id: 4,
    icon: "🚑",
    title: "Emergency",
    description: "24/7 emergency services and ambulance booking"
  },
  {
    id: 5,
    icon: "📝",
    title: "Health Blogs",
    description: "Read health tips and disease information from experts"
  },
  {
    id: 6,
    icon: "💬",
    title: "Chat Support",
    description: "Get instant help from our healthcare support team"
  }
];

const Services = () => {
  return (
    <section style={{
      padding: '60px 80px',
      backgroundColor: '#ffffff'
    }}>
      {/* Section Heading */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1a237e',
          marginBottom: '10px'
        }}>
          🏥 Our Services
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Comprehensive healthcare services at your fingertips
        </p>
      </div>

      {/* Services Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {services.map((service) => (
          <div
            key={service.id}
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '15px',
              padding: '30px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid #e9ecef'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#007bff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.borderColor = '#e9ecef';
            }}
          >
            {/* Icon */}
            <div style={{
              fontSize: '48px',
              marginBottom: '15px'
            }}>
              {service.icon}
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1a237e',
              marginBottom: '10px'
            }}>
              {service.title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.6',
              margin: '0'
            }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;