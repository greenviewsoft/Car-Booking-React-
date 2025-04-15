import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import { Car } from '../types';
import { Loader } from 'lucide-react';
import { carService } from '../services/cars';
import toast from 'react-hot-toast';

export default function RegularCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        console.log('RegularCars: Fetching cars...');
        const response = await carService.getAllCars();
        console.log('RegularCars - Raw API Response:', response);
        
        // Handle the specific API response structure
        let carsData;
        if (response?.success === true && response?.data?.data && Array.isArray(response.data.data)) {
          carsData = response.data.data;
          console.log('RegularCars - Using data.data array');
        } else if (response?.data?.cars) {
          carsData = response.data.cars;
          console.log('RegularCars - Using data.cars array');
        } else if (Array.isArray(response?.data)) {
          carsData = response.data;
          console.log('RegularCars - Using data array');
        } else if (Array.isArray(response)) {
          carsData = response;
          console.log('RegularCars - Using response array');
        } else {
          console.error('RegularCars - Unexpected data structure:', response);
          throw new Error('Invalid data structure received');
        }
        
        console.log('RegularCars - Extracted cars data:', carsData);
        
        // Save debug info
        setDebugInfo({
          rawResponse: response,
          extractedData: carsData
        });
        
        // Log each car's category for debugging
        carsData.forEach((car: any, index: number) => {
          console.log(`Car ${index} - ID: ${car.id}, Model: ${car.model}, Category: "${car.category}"`);
        });
        
        // For testing purposes, consider all cars as regular except luxury and popular
        const regularCars = carsData.filter((car: any) => {
          const carCategory = (car.category || '').toLowerCase();
          const isRegular = carCategory !== 'luxury' && carCategory !== 'popular';
          
          console.log(`Car ${car.id} (${car.model}) - Category: "${car.category}" -> Is Regular: ${isRegular}`);
          
          return isRegular;
        });
        
        console.log('RegularCars - Filtered regular cars before transform:', regularCars);
        
        // Transform the filtered cars
        const transformedCars = regularCars.map((car: any) => {
          const transformed = carService.transformCarData(car);
          console.log(`Transformed car ${car.id}:`, transformed);
          return transformed;
        });
        
        console.log('RegularCars - Final transformed regular cars:', transformedCars);
        setCars(transformedCars);
      } catch (err) {
        console.error('Error fetching regular cars:', err);
        setError('Failed to load regular cars');
        toast.error('Failed to load regular cars');
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
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Regular Cars</h2>
            <p className="text-gray-600">Reliable and comfortable vehicles for everyday use</p>
          </div>
          
          <div className="text-center py-10">
            <p className="text-gray-600">No regular cars available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Regular Cars</h2>
          <p className="text-gray-600">Reliable and comfortable vehicles for everyday use</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 