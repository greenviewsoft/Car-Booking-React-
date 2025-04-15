import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import { Car } from '../types';
import { Loader } from 'lucide-react';
import { carService } from '../services/cars';
import toast from 'react-hot-toast';

export default function Economy() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        // Get all cars and filter for luxury category
        const response = await carService.getAllCars();
        console.log('Economy component - Raw API Response:', response);
        
        // Handle the specific API response structure
        let carsData;
        if (response?.success === true && response?.data?.data && Array.isArray(response.data.data)) {
          carsData = response.data.data;
        } else if (response?.data?.cars) {
          carsData = response.data.cars;
        } else if (Array.isArray(response?.data)) {
          carsData = response.data;
        } else if (Array.isArray(response)) {
          carsData = response;
        } else {
          console.error('Unexpected data structure:', response);
          throw new Error('Invalid data structure received');
        }
        
        console.log('Economy component - Extracted cars data:', carsData);
        
        // Filter for luxury cars - case insensitive
        const luxuryCars = carsData
          .filter((car: any) => {
            const carCategory = (car.category || '').toLowerCase();
            return carCategory === 'luxury' || carCategory.includes('luxury');
          })
          .map((car: any) => carService.transformCarData(car));
        
        console.log('Economy component - Luxury cars:', luxuryCars);
        setCars(luxuryCars);
      } catch (err) {
        console.error('Error fetching luxury cars:', err);
        setError('Failed to load luxury cars');
        toast.error('Failed to load cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        {error}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No luxury cars available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Luxury Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <CarCard key={car.id} car={car} index={index} />
        ))}
      </div>
    </div>
  );
}
