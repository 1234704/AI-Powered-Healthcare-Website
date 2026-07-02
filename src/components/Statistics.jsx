import React, { useEffect, useRef, useState } from 'react';

const Statistics = () => {
  const [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
    clinics: 0,
    satisfaction: 0
  });

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targetCounts = {
      doctors: 500,
      patients: 10000,
      clinics: 50,
      satisfaction: 99
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        doctors: Math.min(Math.floor(targetCounts.doctors * progress), targetCounts.doctors),
        patients: Math.min(Math.floor(targetCounts.patients * progress), targetCounts.patients),
        clinics: Math.min(Math.floor(targetCounts.clinics * progress), targetCounts.clinics),
        satisfaction: Math.min(Math.floor(targetCounts.satisfaction * progress), targetCounts.satisfaction)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targetCounts);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const stats = [
    {
      id: 1,
      icon: "👨‍⚕️",
      value: counts.doctors,
      label: "Expert Doctors",
      suffix: "+"
    },
    {
      id: 2,
      icon: "👤",
      value: counts.patients,
      label: "Happy Patients",
      suffix: "+"
    },
    {
      id: 3,
      icon: "🏥",
      value: counts.clinics,
      label: "Partner Clinics",
      suffix: "+"
    },
    {
      id: 4,
      icon: "⭐",
      value: counts.satisfaction,
      label: "Satisfaction Rate",
      suffix: "%"
    }
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '60px 80px',
      }}
    >
      {/* Section Heading */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#1a237e'
        }}>
          📊 Our Impact
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#666', 
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Transforming healthcare with numbers that matter
        </p>
      </div>

      {/* Statistics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            style={{
              padding: '20px',
              backgroundColor: '#eef2f7', 
              borderRadius: '15px',
              transition: 'all 0.3s ease',
              border: '1px solid #c7cbce'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
          >
            {/* Icon */}
            <div style={{
              fontSize: '48px',
              marginBottom: '15px'
            }}>
              {stat.icon}
            </div>

            {/* Number with Counter */}
            <div style={{
              fontSize: '42px',
              fontWeight: 'bold',
              marginBottom: '5px',
              color: '#007bff' 
            }}>
              {stat.value.toLocaleString()}{stat.suffix}
            </div>

            {/* Label */}
            <div style={{
              fontSize: '16px',
              color: '#333', 
              fontWeight: '500'
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;