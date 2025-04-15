import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { carService } from '../services/cars';
import toast from 'react-hot-toast';

interface Booking {
  id: number;
  car_id: number;
  start_date: string;
  pickup_location: string;
  drop_location: string;
  passengers: number | null;
  note: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_price: string;
  car?: {
    id: number;
    model: string;
    daily_rate: string;
    image_url: string;
  };
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('auth_token');
      console.log('📦 Token from localStorage:', token);

      try {
        const data = await carService.getUserBookings();
        console.log('✅ Bookings fetched:', data);
        setBookings(data);
      } catch (error) {
        console.error('❌ Error fetching bookings:', error);
        toast.error('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case 'confirmed':
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="text-blue-500 w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="p-4">Loading bookings...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-xl p-4 shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">
                  {booking.car?.model || 'Model Unknown'}
                </h3>
                {renderStatusIcon(booking.status)}
              </div>

              {booking.car?.image_url && (
                <img
                  src={booking.car.image_url}
                  alt={booking.car.model}
                  className="w-full h-48 object-cover rounded-xl mb-2"
                />
              )}

              <p className="text-sm text-gray-600">
                Pickup: {booking.pickup_location} → Drop-off: {booking.drop_location}
              </p>
              <p className="text-sm text-gray-600">
                Start Date: {new Date(booking.start_date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Passengers: {booking.passengers ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">Note: {booking.note}</p>
              <p className="text-sm text-gray-600 capitalize">
                Status: {booking.status}
              </p>
              {booking.total_price && (
                <p className="text-sm text-gray-600">
                  Total Price: ${booking.total_price}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
