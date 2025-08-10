import Constants from 'expo-constants';
import { mockResults, mockDetails } from './mockData';
import { SearchResult } from './types';

// Simple in-memory state for bookings/messages
const bookings: Record<string, any> = {};
const threads: Record<string, any> = {};
const listeners: Record<string, any[]> = {};

let idCounter = 1;
const newId = () => String(idCounter++);

export function getSearchResults({ city, category }:{ city:string; category:string }): SearchResult[] {
  // Mock ignores filters, just returns seeded results
  return mockResults;
}

export function getGarageDetails(id: string, hasPass: boolean) {
  if (!hasPass) return null;
  return mockDetails[id];
}

export function createBooking(garageId: string, when: string) {
  const id = newId();
  bookings[id] = { id, garageId, status: 'confirmed', createdAt: Date.now() };
  // create chat thread
  threads[id] = { bookingId: id, messages: [{ id: newId(), sender:'them', body:'مرحبا! متى تصل؟'}] };
  // start fake tracking pings
  startFakeTracking(id);
  return id;
}

export function getBooking(id: string) {
  return bookings[id];
}

export function startService(id: string) {
  if (bookings[id]) bookings[id].status = 'in_progress';
}

export function completeService(id: string) {
  if (bookings[id]) bookings[id].status = 'completed';
}

export function getThread(bookingId: string) {
  return threads[bookingId] || { bookingId, messages: [] };
}

export function sendMessage(bookingId: string, body: string) {
  const thread = getThread(bookingId);
  thread.messages.push({ id: newId(), sender: 'me', body });
}

export function subscribeTracking(bookingId: string, cb: (coords:{lat:number;lon:number}) => void) {
  if (!listeners[bookingId]) listeners[bookingId] = [];
  listeners[bookingId].push(cb);
}

export function unsubscribeTracking(bookingId: string) {
  listeners[bookingId] = [];
}

function startFakeTracking(bookingId: string) {
  let lat = 24.2075, lon = 55.7447;
  const interval = setInterval(() => {
    const booking = bookings[bookingId];
    if (!booking || booking.status === 'completed') { clearInterval(interval); return; }
    lat += (Math.random()-0.5)*0.001;
    lon += (Math.random()-0.5)*0.001;
    (listeners[bookingId]||[]).forEach(cb => cb({ lat, lon }));
  }, 1500);
}

// FUTURE: switch to supabase mode if env set
const mode = (Constants?.expoConfig?.extra as any)?.API_MODE || process.env.EXPO_PUBLIC_API_MODE || 'mock';
console.log('API mode:', mode);
