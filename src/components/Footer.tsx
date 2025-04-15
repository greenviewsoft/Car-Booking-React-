import React from 'react';
import { Car, Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              <span className="text-2xl font-bold text-white">Green CarBook</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 leading-relaxed">
              Experience luxury on wheels with our premium car rental service. We provide exceptional vehicles and unmatched customer service for your journey.
            </p>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Information</h3>
            <ul className="space-y-4">
              {['About Us', 'FAQ', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Useful Links</h3>
            <ul className="space-y-4">
              {[
                'Privacy Policy',
                'Terms & Conditions',
                'Refund Policy'
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors duration-300">
                    +8801765444480
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href="mailto:greenviewsoft@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Greenviewsoft@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-white font-medium">Address</p>
                  <p className="text-gray-400">
                  Fredericton, New Brunswick, Canada 
                  </p>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="flex space-x-4 pt-4">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Youtube, href: '#' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Updated with two sections */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Green CarBook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
