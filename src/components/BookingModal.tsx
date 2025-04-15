import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { authService } from '../services/auth';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car;
  openAuthModal: () => void; // Add this prop to open auth modal
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedCar,
  openAuthModal 
}) => {
  const [formData, setFormData] = useState({
    pickup_location: '',
    drop_location: '',
    start_date: '',
    passengers: 1,
    phone: '',
    note: '',
  });
  
  // Check if user is logged in when modal opens
  useEffect(() => {
    if (isOpen) {
      // Reset form data
      setFormData({
        pickup_location: '',
        drop_location: '',
        start_date: '',
        passengers: 1,
        phone: '',
        note: '',
      });
      
      // Check authentication
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('❌ Please login first to make a booking');
        onClose(); // Close booking modal
        openAuthModal(); // Open auth modal
      }
    }
  }, [isOpen, onClose, openAuthModal]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
  
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('❌ Please login first to make a booking');
        onClose();
        openAuthModal();
        return;
      }
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        {
          ...formData,
          car_id: selectedCar.id,
          phone_number: formData.phone, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
      console.log(response);
      toast.success('✅ Booking created successfully!');
      onClose();
    } catch (error: any) {
      console.error(error);
      const message = error?.response?.data?.message || 'Booking failed. Please try again.';
      
      // If unauthenticated error
      if (error?.response?.status === 401) {
        toast.error('❌ Unauthenticated. Please login.');
        onClose();
        openAuthModal();
      } else {
        toast.error(`❌ ${message}`);
      }
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-600">
          <X />
        </button>
        <h2 className="text-2xl font-bold mb-4">Book {selectedCar.model}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
              Number of Passengers
            </label>
            <div className="relative">
              <input
                id="passengers"
                type="number"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                min={1}
                max={7}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                Max: 7
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="pickup_location" className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <input
              id="pickup_location"
              type="text"
              name="pickup_location"
              placeholder="Enter pickup location"
              value={formData.pickup_location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="drop_location" className="block text-sm font-medium text-gray-700">
              Drop-off Location
            </label>
            <input
              id="drop_location"
              type="text"
              name="drop_location"
              placeholder="Enter drop-off location"
              value={formData.drop_location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
              Pickup Date
            </label>
            <input
              id="start_date"
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel" 
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">
              Special Request (Optional)
            </label>
            <textarea
              id="note"
              name="note"
              placeholder="Any special requests or notes"
              value={formData.note}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;