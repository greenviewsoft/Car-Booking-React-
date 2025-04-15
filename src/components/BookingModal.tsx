import React, { useState ,useEffect} from 'react';
import { Car } from '../types';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedCar }) => {
  const [formData, setFormData] = useState({
    pickup_location: '',
    drop_location: '',
    start_date: '',
    passengers: 1,
    phone: '',
    note: '',
  });
  
  useEffect(() => {
    if (isOpen) {
      setFormData({
        pickup_location: '',
        drop_location: '',
        start_date: '',
        passengers: 1,
        phone: '',
        note: '',
      });
    }
  }, [isOpen]);
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
  
      console.log("Submitting booking data:", {
        ...formData,
        car_id: selectedCar.id,
         passengersType: typeof formData.passengers
      });
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        {
          ...formData,
          car_id: selectedCar.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
  
      toast.success('✅ Booking created successfully!');
      onClose();
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.message || 'Booking failed. Please try again.';
      toast.error(`❌ ${message}`);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-600">
          <X />
        </button>
        <h2 className="text-2xl font-bold mb-4">Book {selectedCar.brand} {selectedCar.model}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

        <input
  type="number"
  name="passengers"
  placeholder="Number of Passengers"
  value={formData.passengers}
  onChange={handleChange}
  min={1}
  max={7}
  required
  className="w-full border rounded px-3 py-2"
/>


          <input
            type="text"
            name="pickup_location"
            placeholder="Pickup Location"
            value={formData.pickup_location}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            name="drop_location"
            placeholder="Drop-off Location"
            value={formData.drop_location}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />


          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            name="note"
            placeholder="Special request or note"
            value={formData.note}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

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
