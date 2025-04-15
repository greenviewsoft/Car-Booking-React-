import React, { useEffect, useState } from 'react';
import { Car } from '../types';
import { carService } from '../services/cars';
import CarCard from './CarCard';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

interface CategoryCarsProps {
  category: string;
}

const CategoryCars: React.FC<CategoryCarsProps> = ({ category }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  // Format the category name for display
  const formatCategoryName = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Get the category description
  const getCategoryDescription = (cat: string) => {
    const lowerCat = cat.toLowerCase();
    if (lowerCat === 'popular') {
      return 'Our most sought-after vehicles for your journey';
    } else if (lowerCat === 'regular') {
      return 'Reliable and comfortable vehicles for everyday use';
    } else if (lowerCat === 'luxury') {
      return 'Experience ultimate comfort and style with our premium vehicles';
    } else {
      return 'Find the perfect vehicle for your needs';
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        console.log(`CategoryCars: Fetching cars for category "${category}"...`);
        const response = await carService.getAllCars();
        console.log('Raw API Response:', response);

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

        console.log('Extracted cars data:', carsData);
        
        // Save debug info
        setDebugInfo({
          rawResponse: response,
          extractedData: carsData,
          category: category
        });

        // Log each car's category for debugging
        carsData.forEach((car: any, index: number) => {
          console.log(`Car ${index} - ID: ${car.id}, Model: ${car.model}, Category: "${car.category}"`);
        });

        // Filter and transform the data - using case-insensitive comparison
        const filteredCars = carsData
          .filter((car: any) => {
            // Case-insensitive comparison for category
            const carCategory = (car.category || '').toLowerCase();
            const requestedCategory = category.toLowerCase();
            
            console.log(`Comparing car category: "${carCategory}" with requested: "${requestedCategory}"`);
            
            // For "regular" category, include cars that don't have a specific category
            // or have "regular" category, but exclude luxury and popular
            if (requestedCategory === 'regular') {
              // Consider a car "regular" if:
              // 1. It explicitly has "regular" category, OR
              // 2. It has no category or empty category, OR
              // 3. It has a category that is not "luxury" and not "popular"
              const isRegular = carCategory === 'regular' || 
                               carCategory === '' || 
                               !car.category || 
                               (carCategory !== 'luxury' && 
                                carCategory !== 'popular' && 
                                carCategory !== 'premium');
              
              console.log(`Car ${car.id} (${car.model}) - Is Regular: ${isRegular}`);
              return isRegular;
            }
            
            // For other categories, do a direct match
            const isMatch = carCategory === requestedCategory || 
                           carCategory.includes(requestedCategory) || 
                           requestedCategory.includes(carCategory);
            
            console.log(`Car ${car.id} (${car.model}) - Is ${requestedCategory}: ${isMatch}`);
            return isMatch;
          })
          .map((car: any) => carService.transformCarData(car));

        console.log(`Filtered cars for ${category}:`, filteredCars);
        setCars(filteredCars);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars');
        toast.error('Failed to load cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [category]);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">{formatCategoryName(category)} Cars</h2>
          <p className="text-gray-600">{getCategoryDescription(category)}</p>
        </div>
        
        {error ? (
          <div className="text-center text-red-600 py-10">
            {error}
            {debugInfo && (
              <div className="mt-4">
                <button 
                  onClick={() => console.log('Debug Info:', debugInfo)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Log Debug Info
                </button>
              </div>
            )}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">No cars available in this category at the moment.</p>
            {debugInfo && (
              <div className="mt-4">
                <button 
                  onClick={() => console.log('Debug Info:', debugInfo)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Log Debug Info
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryCars;


