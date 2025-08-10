# GarageLink Starter (Expo + TypeScript)

This is a **Phase 0** runnable starter that works in **Expo Go** (no native builds required).
It includes mock data and a mock payment flow so you can test **search → unlock → details → booking → start/complete → review**.

## Quick Start
1) Install Node.js LTS (18+), then install Expo CLI:
   ```bash
   npm i -g expo
   ```
2) Install deps:
   ```bash
   npm install
   ```
3) Run:
   ```bash
   npx expo start
   ```
4) Open the app in **Expo Go** on your phone (scan the QR).

> This starter defaults to **Mock Mode** (no accounts required). When you’re ready, flip to Supabase/Stripe/Checkout by adding env variables later.

## Features in this starter
- Anonymous search results (no garage names/phones before unlock)
- 5 AED unlock **mock** payment (simulated) valid for 24h to view multiple garages
- Booking flow (mock backend)
- Uber-style **Start Service** + **Complete** flow
- Live tracking simulation (fake location updates)
- In-app chat (local mock thread)
- i18n: **Arabic**, **English**, **Urdu** (switch in Settings)

## When ready for real backend
- Add `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` to `.env` and switch API mode to `supabase` in `lib/api.ts`.
- Integrate Stripe or Checkout.com SDKs in `lib/payments.ts` (currently mocked).
