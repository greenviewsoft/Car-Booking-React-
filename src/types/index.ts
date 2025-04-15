export interface Car {
  id: number;
  model: string;
  year: number;
  daily_rate: string;
  image_url: string;
  available: number; // 0 for false, 1 for true
  seats: number;
  doors: number;
  fuel_type: string;
  category: string;
  active: boolean;
}

