import React, { useState } from 'react';
import { Users, DoorClosed, Fuel, Briefcase, Heart } from 'lucide-react';
import { carService } from '../services/cars';
import { Car } from '../types';
import BookingModal from './BookingModal';

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isAvailable = car.status === 1;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 opacity-0 animate-fadeInUp group"
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Car Image with Hover Effects */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={carService.getImageUrl(car.image_url)}
            alt={car.model}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          
          {/* Gradient Overlay that intensifies on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"></div>
          
          {/* Status Badge */}
          {!isAvailable && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md z-10">
              Booked
            </div>
          )}
          
          {/* Wishlist Icon (decorative) */}
          <button className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
            <Heart className="w-4 h-4" />
          </button>
          
          {/* Car Model Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-lg drop-shadow-md">{car.model}</h3>
              <span className="bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm font-semibold">
                ${car.daily_rate}
              </span>
            </div>
          </div>
        </div>

        {/* Car Info */}
        <div className="p-5">
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="text-sm text-gray-500">
                {car.year} • {car.transmission || 'Automatic'}
              </div>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {car.category}
            </div>
          </div>

          {/* Car Features */}
          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-1.5">
              <div className="bg-blue-50 p-1.5 rounded-md">
                <Users className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span>{car.seats} Seats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="bg-purple-50 p-1.5 rounded-md">
                <Briefcase className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span>{car.seats > 4 ? 3 : 1} Luggage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="bg-green-50 p-1.5 rounded-md">
                <DoorClosed className="w-3.5 h-3.5 text-green-600" />
              </div>
              <span>{car.doors} Doors</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="bg-amber-50 p-1.5 rounded-md">
                <Fuel className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <span>{car.fuel_type}</span>
            </div>
          </div>

          {/* Book Button with Scale Animation */}
          {isAvailable ? (
            <button
              onClick={handleOpenModal}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
            >
              Book Now
            </button>
          ) : (
            <div className="w-full bg-gray-200 text-gray-500 py-2.5 rounded-lg text-sm font-medium text-center">
              Not Available
            </div>
          )}
        </div>
      </div>
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        selectedCar={car} 
      />
    </>
  );
};

export default CarCard;