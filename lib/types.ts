export type PriceBand = '$'|'$$'|'$$$';
export type PaymentProvider = 'stripe' | 'checkout';
export type BookingStatus = 'confirmed'|'in_progress'|'completed';

export interface SearchResult {
  id: string;
  lat: number; lon: number;
  avg_rating: number; rating_count: number;
  price_band: PriceBand;
  offers_pickup: boolean;
  distance_km: number;
}

export interface GarageDetails {
  id: string;
  name: string;
  address: string;
  avg_rating: number;
  rating_count: number;
  price_band: PriceBand;
  offers_pickup: boolean;
}
