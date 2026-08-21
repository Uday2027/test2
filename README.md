# FLY FLY — Luxury & Adventure Tour Platform

A fullstack travel platform faithfully replicating the "Journey to All World Corners" theme, crafted with **React 19**, **Express**, **GSAP**, **Framer Motion**, **Tailwind CSS**, and **Radix UI / Shadcn-style** components.

---

## 🌟 Visual Theme & Features

1. **Hero Experience**
   - Panoramic Andean Machu Picchu backdrop with deep midnight-navy overlays and cinematic lighting.
   - Dynamic headline: *"Journey to All World Corners"*.
   - Glowing amber *"Book a Trip"* pill CTA.
   - Interactive hero floating card carousel (Hawaii Beach, Arctic Wonders Iceland, Incan Odyssey Peru) with live ratings and smooth `< >` slide navigation.

2. **Statistics & Partner Perks**
   - Organic wave transition dividing the sections.
   - GSAP ScrollTrigger metric counters (10 Years of Experience, 5000+ Satisfied Clients, 100 Countries Covered).
   - Early-bird promo banner offering **15% discount** for early applicants.
   - Stack of 3 tilted polaroid-style 3D photo cards with white borders and hover lifting effects.
   - Subtle background watermarks (passport visa stamp and palm frond outlines).

3. **About Us Section**
   - Luxury boutique travel agency office showcase frame.
   - Company philosophy and narrative.
   - 3 core value badges: *Reliability*, *All Fast*, and *Profitability / Best Value Guarantee*.
   - Animated airplane flight path traversing the dark section.

4. **Destinations Explorer**
   - Continent tabs: *Australia*, *Africa*, *Europe*, *Asia* (vibrant gold active glow), *New Zeland*.
   - *"Five reasons to visit [Region]"* interactive numbered feature cards.
   - Curated regional spots with ratings, prices, durations, and instant booking triggers.

5. **Exclusive Tours Showcase**
   - Searchable and filterable catalogue of signature small-group tours.
   - Modal day-by-day itinerary breakdown, inclusions list, and direct booking.

6. **Interactive Booking Engine & Reviews**
   - Full booking form with guest calculator and automatic **15% discount** calculation (`FLYWORLD15`).
   - Interactive celebration confetti (`canvas-confetti`) and official booking confirmation receipt.
   - Traveler review carousel and interactive review submission modal.

---

## 📁 Organized Image Assets (`client/public/image/`)

- `hero/`: `machu_picchu_hero.jpg`, `hawaii_beach.jpg`, `arctic_wonders.jpg`, `tropical_island.jpg`
- `about/`: `travel_office.jpg`
- `gallery/`: `mountain_lake.jpg`, `resort_aerial.jpg`, `machu_picchu_card.jpg`
- `destinations/`: Bali, Kyoto, Swiss Alps, Serengeti, Sydney, Milford Sound, Santorini, etc.
- `reviews/`: Traveler avatar portraits

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client and server dependencies
cd client && npm install && cd ../server && npm install && cd ..
```

### 2. Run in Development Mode
To run both the **React Frontend** (`http://localhost:5173`) and **Express Backend** (`http://localhost:5000`) concurrently:
```bash
npm run dev
```

Or individually:
```bash
npm run dev:client   # Runs Vite frontend on port 5173
npm run dev:server   # Runs Express backend on port 5000
```

### 3. Production Build
```bash
npm run build
```

---

## ⚙️ Environment Variables

### Backend (`server/.env`):
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```
# test2
