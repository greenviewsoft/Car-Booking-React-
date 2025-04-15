// types.ts
export interface Car {
  id: number;
  model: string;
  year: number;
  daily_rate: string;
  image_url: string;
  available: number;
  category: string;
  seats: number;
  doors: number;
  fuel_type: string;
  transmission?: string;
  description?: string;
  status: number;
  // Remove phone from here - it doesn't belong in Car type
}

export interface Booking {
  id?: number;
  car_id: number;
  user_id?: number;
  pickup_location: string;
  drop_location: string;
  start_date: string;
  passengers: number;
  phone: string; 
  note?: string;
  status?: string;
  total_price?: string;
}