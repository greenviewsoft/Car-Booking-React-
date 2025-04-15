import React from 'react';
import Hero from '../components/Hero';
import PopularCars from '../components/PopularCars';
import RegularCars from '../components/RegularCars';
import CategoryCars from '../components/CategoryCars';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <div>
      <Hero />
      <PopularCars />
      <RegularCars />
      <CategoryCars category="luxury" />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home; 