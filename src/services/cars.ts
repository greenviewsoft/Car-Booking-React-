import { carAPI } from './api';
import { Car } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL;

export const carService = {
  getAllCars: async () => {
    try {
      const data = await carAPI.getAllCars();
      return data;
    } catch (error) {
      console.error('Error in getAllCars:', error);
      throw error;
    }
  },

  getCarsByCategory: async (category: string) => {
    try {
      const data = await carAPI.getAllCars();
      
      // Handle different response structures
      let carsData;
      if (data?.success === true && data?.data?.data && Array.isArray(data.data.data)) {
        carsData = data.data.data;
      } else if (data?.data?.cars) {
        carsData = data.data.cars;
      } else if (data?.data) {
        carsData = data.data;
      } else if (Array.isArray(data)) {
        carsData = data;
      } else {
        throw new Error('Invalid data structure received');
      }
      
      // Case-insensitive category filtering with partial matching
      const requestedCategory = category.toLowerCase();
      const filteredCars = carsData.filter((car: any) => {
        const carCategory = (car.category || '').toLowerCase();
        return carCategory === requestedCategory || 
               carCategory.includes(requestedCategory) || 
               requestedCategory.includes(carCategory);
      });
      
      console.log(`Filtered cars for category "${category}":`, filteredCars);
      return filteredCars;
    } catch (error) {
      console.error('Error in getCarsByCategory:', error);
      throw error;
    }
  },

  getImageUrl: (imageUrl: string) => {
    if (!imageUrl) return 'https://via.placeholder.com/400x300?text=No+Image';
    
    // If it's already a full URL, return it
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative path starting with 'upload/', prepend the API URL
    if (imageUrl.startsWith('upload/')) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
      const baseUrl = apiUrl.replace('/api/v1', '');
      console.log(`Converting image path: ${imageUrl} to URL: ${baseUrl}/${imageUrl}`);
      return `${baseUrl}/${imageUrl}`;
    }
    
    // Otherwise, assume it's a relative path and prepend the API URL
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    const baseUrl = apiUrl.replace('/api/v1', '');
    console.log(`Converting image path: ${imageUrl} to URL: ${baseUrl}/${imageUrl}`);
    return `${baseUrl}/${imageUrl}`;
  }, 
  
  
  transformCarData: (car: any): Car => {
    return {
      id: car.id || car._id,
      model: car.model || 'Unknown Model',
      year: car.year || new Date().getFullYear(),
      daily_rate: car.daily_rate || car.price || '0',
      image_url: car.image_url || car.image || '',
      available: typeof car.available === 'boolean' ? (car.available ? 1 : 0) : car.available || 1,
      category: car.category || 'Unknown',
      seats: car.seats || 4,
      doors: car.doors || 4,
      fuel_type: car.fuel_type || 'Gasoline',
      transmission: car.transmission || 'Manual',
      description: car.description || '',
      status: car.status !== undefined ? car.status : 1
    };
  },

  normalizeCarData: (data: any) => {
    console.log('Normalizing car data:', data);
    
    // Handle different response structures
    let carsData;
    
    if (!data) {
      console.error('No data received');
      return [];
    }
    
    // Handle the specific paginated structure from the API
    if (data.success === true && data.data && data.data.data && Array.isArray(data.data.data)) {
      carsData = data.data.data;
      console.log('Extracted cars from paginated response:', carsData);
    } else if (data.data?.cars) {
      carsData = data.data.cars;
    } else if (data.data && Array.isArray(data.data)) {
      carsData = data.data;
    } else if (Array.isArray(data)) {
      carsData = data;
    } else if (typeof data === 'object') {
      // Try to extract cars from unknown object structure
      const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
      if (possibleArrays.length > 0) {
        // Use the longest array found (most likely to be the cars array)
        carsData = possibleArrays.reduce((a, b) => a.length > b.length ? a : b);
      } else {
        console.error('Could not find cars array in data');
        return [];
      }
    } else {
      console.error('Invalid data structure received');
      return [];
    }
    
    // Ensure we're working with an array
    if (!Array.isArray(carsData)) {
      console.error('Cars data is not an array after normalization');
      return [];
    }
    
    console.log('Normalized cars data:', carsData);
    return carsData;
  },
  getUserBookings: async () => {
    try {
      const data = await carAPI.getUserBookings();
      return data;
    } catch (error) {
      console.error('Error in getUserBookings:', error);
      throw error;
    }
  }
};
