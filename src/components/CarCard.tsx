import React, { useState } from 'react';
import { Users, DoorClosed, Fuel, Briefcase } from 'lucide-react';
import { carService } from '../services/cars';
import { Car } from '../types';
import BookingModal from './BookingModal';

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl opacity-0 animate-fadeInUp"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative group h-48 overflow-hidden">
          <img
            src={carService.getImageUrl(car.image_url)}
            alt={car.model}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:opacity-90 transition-opacity duration-500" />
          <span className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-full font-semibold ${
            isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {isAvailable ? 'Available' : 'Not Available'}
          </span>
        </div>
        <div className="p-5 space-y-3">
          <h3 className="text-xl font-bold text-gray-800">{car.brand} {car.model}</h3>
          <p className="text-gray-500 text-sm">{car.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
            <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {car.seats} Seats</div>
            <div className="flex items-center gap-1"><DoorClosed className="w-4 h-4" /> {car.doors} Doors</div>
            <div className="flex items-center gap-1"><Fuel className="w-4 h-4" /> {car.fuel_type}</div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-semibold text-blue-600">${car.rent_price}/day</span>
            {isAvailable && (
              <button
                onClick={handleOpenModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            )}
          </div>
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