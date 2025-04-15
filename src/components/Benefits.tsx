import React from 'react';
import { Shield, Clock, Headphones, CreditCard } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'All our vehicles come with comprehensive insurance coverage for your peace of mind.'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Book your dream car anytime, anywhere with our round-the-clock service.'
  },
  {
    icon: Headphones,
    title: 'Premium Support',
    description: 'Our dedicated support team is always ready to assist you with any queries.'
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Choose from multiple payment options that suit your convenience.'
  }
];

export default function Benefits() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 opacity-0 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience premium car rental service with benefits that put you first
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-lg animate-float">
                  <benefit.icon className="w-8 h-8" />
                </div>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}