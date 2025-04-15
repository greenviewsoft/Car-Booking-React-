import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HeroSection() {
  const carImages = [
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  return (
    <div className="relative min-h-[600px] lg:min-h-[700px]">
      {/* Background Slider */}
      <div className="absolute inset-0">
        <Slider {...sliderSettings}>
          {carImages.map((image, index) => (
            <div key={index} className="relative h-[600px] lg:h-[700px]">
              <div 
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Content */}
      <div className="relative h-full">
        <div className="container mx-auto px-4 h-[600px] lg:h-[700px] flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fadeInUp">
              Experience Luxury
              <span className="block text-blue-400">On Your Terms</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Discover our premium collection of luxury vehicles and elevate your
              journey with unparalleled comfort and style.
            </p>
            <div className="space-x-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/cars"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl 
                         hover:bg-blue-700 transition-all duration-300 transform 
                         hover:scale-105 hover:shadow-lg text-lg font-semibold"
              >
                View Our Cars
              </Link>
              <Link
                to="/contact"
                className="inline-block bg-white/10 text-white px-8 py-4 rounded-xl 
                         backdrop-blur-sm hover:bg-white/20 transition-all duration-300 
                         transform hover:scale-105 text-lg font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


