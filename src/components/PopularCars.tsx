import React, { useEffect, useState } from 'react';
import { Car } from '../types';
import { Star, Users, Fuel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { carService } from '../services/cars';
import toast from 'react-hot-toast';

const PopularCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        console.log('PopularCars: Fetching cars...');
        const response = await carService.getAllCars();
        console.log('PopularCars: Raw response:', response);

        // Handle the specific API response structure
        let carsData;
        if (response?.success === true && response?.data?.data && Array.isArray(response.data.data)) {
          carsData = response.data.data;
        } else {
          // Fall back to the normalize function for other structures
          carsData = carService.normalizeCarData(response);
        }

        console.log('PopularCars: Extracted cars data:', carsData);

        // Transform the data
        const transformedCars = carsData.map((car: any) =>
          carService.transformCarData(car)
        );

        console.log('PopularCars: Transformed cars:', transformedCars);

        // Take first 6 cars
        const displayCars = transformedCars.slice(0, 6);
        setCars(displayCars);
      } catch (err) {
        console.error('Error fetching cars in PopularCars:', err);
        setError('Failed to load cars. Please try again later.');
        toast.error('Failed to load cars');

        // In development, use mock data
        if (import.meta.env.DEV) {
          console.log('Using mock data for development');
          const mockCars = [
            // Mock data here...
          ];
          setCars(mockCars);
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">No cars available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={carService.getImageUrl(car.image_url)}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
                {car.available !== 1 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Not Available
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{car.model} ({car.year})</h3>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{car.fuel_type}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">${car.daily_rate}/day</span>
                  <Link
                    to={`/cars/${car.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCars;






