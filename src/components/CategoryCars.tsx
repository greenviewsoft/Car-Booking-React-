import React, { useEffect, useState } from 'react';
import { Car } from '../types';
import { carService } from '../services/cars';
import CarCard from './CarCard';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

interface CategoryCarsProps {
  category: string;
  title?: string;
  description?: string;
}

const CategoryCars: React.FC<CategoryCarsProps> = ({ category, title, description }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        const response = await carService.getAllCars();

        // Extract cars data from response
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
          throw new Error('Invalid data structure received');
        }

        // Filter and transform the data
        const filteredCars = carsData
          .filter((car: any) => {
            const carCategory = (car.category || '').toLowerCase();
            const requestedCategory = category.toLowerCase();
            
            if (requestedCategory === 'regular') {
              return carCategory === 'regular' || 
                    carCategory === '' || 
                    !car.category || 
                    (carCategory !== 'luxury' && 
                    carCategory !== 'popular' && 
                    carCategory !== 'premium');
            }
            
            return carCategory === requestedCategory || 
                  carCategory.includes(requestedCategory) || 
                  requestedCategory.includes(carCategory);
          })
          .map((car: any) => carService.transformCarData(car));

        setCars(filteredCars);
      } catch (err) {
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
        <div className="container mx-auto px-10">
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
     <div className="container mx-auto px-10">
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold mb-2">{title || formatCategoryName(category)}</h2>
    <p className="text-gray-600 max-w-2xl mx-auto">
      {description || getCategoryDescription(category)}
    </p>
  </div>
        
        {error ? (
          <div className="text-center text-red-600 py-10">
            {error}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">No cars available in this category at the moment.</p>
          </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

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