import React from 'react';
import Hero from './Hero';
import FeaturedDoctors from './FeaturedDoctors';
import Services from './Services';
import Statistics from './Statistics';
import Testimonials from './Testimonials';
import CTA from './CTA';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedDoctors />
      <Services /> 
      <Statistics />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;