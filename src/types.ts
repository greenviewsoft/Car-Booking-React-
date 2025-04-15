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
  status: number; // Changed from 'active' to 'status'
}

