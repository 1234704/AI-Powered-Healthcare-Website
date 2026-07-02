import React, { useState } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Aisha Khan",
      location: "Lahore, Pakistan",
      rating: 5,
      review: "Amazing experience! The doctors are very professional and caring. I booked an appointment online and it was so easy. Highly recommended!",
      image: "👩"
    },
    {
      id: 2,
      name: "Muhammad Ali",
      location: "Karachi, Pakistan",
      rating: 5,
      review: "Best healthcare platform in Pakistan! The medicine delivery service is fast and reliable. I always use this for my family's health needs.",
      image: "👨"
    },
    {
      id: 3,
      name: "Fatima Noor",
      location: "Islamabad, Pakistan",
      rating: 4,
      review: "Very user-friendly website. Found a specialist doctor easily and the lab test booking was smooth. The results came within 24 hours.",
      image: "👩‍🦰"
    },
    {
      id: 4,
      name: "Ahmed Raza",
      location: "Rawalpindi, Pakistan",
      rating: 5,
      review: "The emergency service is a lifesaver! My father needed urgent care and we got immediate assistance. Thank you for this amazing service.",
      image: "👨"
    }
  ];

  // Rating stars generate karein
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Active index for carousel
  const [activeIndex, setActiveIndex] = useState(0);

  // Next/Previous functions
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
          💬 What Our Patients Say
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Real stories from real patients who trust our healthcare platform
        </p>
      </div>

      {/* Carousel */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Testimonial Card */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            textAlign: 'center',
            transition: 'all 0.5s ease',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Patient Image/Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#e8f5e9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            marginBottom: '15px',
            border: '3px solid #007bff'
          }}>
            {testimonials[activeIndex].image}
          </div>

          {/* Rating Stars */}
          <div style={{
            fontSize: '20px',
            marginBottom: '10px',
            color: '#ffc107'
          }}>
            {renderStars(testimonials[activeIndex].rating)}
          </div>

          {/* Review Text */}
          <p style={{
            fontSize: '16px',
            color: '#333',
            lineHeight: '1.8',
            marginBottom: '15px',
            fontStyle: 'italic',
            maxWidth: '600px'
          }}>
            "{testimonials[activeIndex].review}"
          </p>

          {/* Patient Name */}
          <h4 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1a237e',
            marginBottom: '5px'
          }}>
            {testimonials[activeIndex].name}
          </h4>

          {/* Location */}
          <p style={{
            fontSize: '14px',
            color: '#666'
          }}>
            📍 {testimonials[activeIndex].location}
          </p>
        </div>

        {/* Carousel Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '30px'
        }}>
          <button
            onClick={prevTestimonial}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#007bff';
            }}
          >
            ← Previous
          </button>

          <button
            onClick={nextTestimonial}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#007bff';
            }}
          >
            Next →
          </button>
        </div>

        {/* Dots Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '15px'
        }}>
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: index === activeIndex ? '#007bff' : '#ccc',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;