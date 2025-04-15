import { carAPI } from './api';
import { Car } from '../types';

export const carService = {
  getAllCars: async () => {
    try {
      const data = await carAPI.getAllCars();
      return data;
    } catch (error) {
      throw error;
    }
  },

  getImageUrl: (imageUrl: string) => {
    if (!imageUrl) return 'https://via.placeholder.com/400x300?text=No+Image';
    
    // If it's already a full URL, return it
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's a relative path, prepend the API URL
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    const baseUrl = apiUrl.replace('/api/v1', '');
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

  getUserBookings: async () => {
    try {
      const data = await carAPI.getUserBookings();
      return data;
    } catch (error) {
      throw error;
    }
  }
};