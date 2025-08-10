import { SearchResult, GarageDetails } from './types';

// Al Ain rough center
const center = { lat: 24.2075, lon: 55.7447 };

function randOffset() { return (Math.random() - 0.5) * 0.05; }

export const mockResults: SearchResult[] = Array.from({length: 10}).map((_,i) => ({
  id: `g${i+1}`,
  lat: center.lat + randOffset(),
  lon: center.lon + randOffset(),
  avg_rating: 4 + Math.random(),
  rating_count: 10 + Math.floor(Math.random()*90),
  price_band: (['$','$$','$$$'] as const)[Math.floor(Math.random()*3)],
  offers_pickup: Math.random() > 0.5,
  distance_km: 1 + Math.random()*15
}));

export const mockDetails: Record<string, GarageDetails> = Object.fromEntries(
  mockResults.map((r,i) => [r.id, {
    id: r.id,
    name: `Al Ain Service Garage #${i+1}`,
    address: `Street ${10+i}, Industrial Area, Al Ain`,
    avg_rating: r.avg_rating,
    rating_count: r.rating_count,
    price_band: r.price_band,
    offers_pickup: r.offers_pickup
  }])
);
