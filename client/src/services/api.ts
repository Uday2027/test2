import { Tour, DestinationRegion, Review, StatsData, BookingPayload, BookingResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Fallback data for robust offline and fast initial rendering
export const FALLBACK_STATS: StatsData = {
  yearsOfExperience: 10,
  satisfiedClients: 5000,
  countriesCovered: 100,
  expertGuides: 45,
  partnerDiscountsPercent: 15,
  limitedSpotsLeft: 18
};

export const FALLBACK_HERO_TOURS: Tour[] = [
  {
    id: 'hawaii-beach-escape',
    title: 'Hawaii Beach & Sunset Paradise',
    subtitle: 'Golden sands, volcanic shores & turquoise Pacific waves',
    country: 'USA',
    location: 'Hawaii Beach',
    region: 'Americas',
    rating: 7.8,
    reviewCount: 320,
    price: 1450,
    originalPrice: 1720,
    duration: '7 Days / 6 Nights',
    groupSize: 'Max 12 People',
    image: '/image/hero/hawaii_beach.jpg',
    featured: true,
    heroSlide: true,
    tag: 'Trending',
    description: 'Immerse yourself in tropical beauty with curated ocean-front stays, private catamaran sunset sails, and guided hikes to volcanic craters and secluded waterfalls.',
    highlights: ['Sunset catamaran cruise with luau dinner', 'Snorkeling with sea turtles at Molokini Crater', 'Scenic road to Hana guided discovery', 'Luxury 5-star beachfront resort'],
    itinerary: [
      { day: 1, title: 'Aloha Welcome & Beachfront Check-in', desc: 'Arrive in Maui, lei greeting, luxury check-in, and sunset cocktails.' },
      { day: 2, title: 'Road to Hana Rainforest Safari', desc: 'Explore hidden waterfalls, bamboo forests, and black sand beaches.' },
      { day: 3, title: 'Turtle Reef Catamaran & Snorkeling', desc: 'Morning catamaran expedition to crystal clear reefs with marine biologists.' }
    ],
    included: ['All 5-Star Hotel Accommodations', 'Daily Gourmet Breakfasts & 3 Dinners', 'All Guided Excursions & Entry Permits', 'Private Luxury Transportation']
  },
  {
    id: 'arctic-wonders-iceland',
    title: 'Arctic Wonders & Northern Lights',
    subtitle: 'Glacier lagoons, Skogafoss waterfalls & geothermal springs',
    country: 'Iceland',
    location: 'Skogafoss',
    region: 'Europe',
    rating: 8.9,
    reviewCount: 412,
    price: 1890,
    originalPrice: 2200,
    duration: '8 Days / 7 Nights',
    image: '/image/hero/arctic_wonders.jpg',
    featured: true,
    heroSlide: true,
    tag: 'Arctic Wonders',
    groupSize: 'Max 10 People',
    description: 'Traverse Iceland’s otherworldly landscapes, from the roaring cascades of Skógafoss to glistening diamond icebergs and midnight auroras.',
    highlights: ['Skógafoss and Seljalandsfoss waterfall exploration', 'Glacier hiking with crampons & ice cave expedition', 'Relaxation at the Blue Lagoon & Sky Lagoon', 'Nightly Northern Lights hunting tours'],
    itinerary: [
      { day: 1, title: 'Reykjavik Arrival & Sky Lagoon Soak', desc: 'Arrival at Keflavik and seven-step spa ritual overlooking the Atlantic.' },
      { day: 2, title: 'Golden Circle & Geysir Eruptions', desc: 'Thingvellir National Park, Gullfoss waterfall, and Strokkur geyser.' }
    ],
    included: ['Boutique Wilderness Hotels & Aurora Pods', 'Super Jeep 4x4 Transportation', 'Ice Cave Gear & Certified Guides']
  },
  {
    id: 'machu-picchu-odyssey',
    title: 'Incan Odyssey & Machu Picchu Citadel',
    subtitle: 'Sacred Valley temples, Andean peaks & lost ancient wonder',
    country: 'Peru',
    location: 'Machu Picchu',
    region: 'Americas',
    rating: 9.4,
    reviewCount: 580,
    price: 1650,
    originalPrice: 1950,
    duration: '6 Days / 5 Nights',
    image: '/image/hero/machu_picchu_hero.jpg',
    featured: true,
    heroSlide: true,
    tag: 'World Wonder',
    groupSize: 'Max 14 People',
    description: 'Ascend into the misty Peruvian Andes to uncover the mystical citadel of Machu Picchu, colonial Cusco, and the artisan markets of the Sacred Valley.',
    highlights: ['Vistadome panoramic train ride to Aguas Calientes', 'Sunrise guided tour of Machu Picchu ruins', 'Ollantaytambo & Pisac ancient stone fortresses'],
    itinerary: [
      { day: 1, title: 'Cusco Imperial Welcome', desc: 'Acclimatize in Cusco with coca tea and historic walking tour.' },
      { day: 2, title: 'Sacred Valley of the Incas', desc: 'Visit Pisac artisan market and the fortress of Ollantaytambo.' }
    ],
    included: ['Luxury Train Tickets', 'Official Machu Picchu & Inca Trail Passes', 'Boutique Heritage Hotels']
  }
];

export const FALLBACK_REGIONS: Record<string, DestinationRegion> = {
  'Asia': {
    id: 'asia',
    name: 'Asia',
    slug: 'Asia',
    tagline: 'Ancient spirituality, ultra-modern wonders & tropical paradise',
    heroImage: '/image/destinations/asia_bali.jpg',
    reasonsToVisit: [
      {
        number: 1,
        title: 'Rich Cultural Heritage & Ancient Temples',
        description: 'From the golden spires of Kyoto to the spiritual shrines of Bali and majestic Angkor Wat, immerse yourself in centuries of living history.'
      },
      {
        number: 2,
        title: 'Unrivaled Culinary Journeys',
        description: 'Delight your taste buds with Michelin-starred street food stalls, fragrant Thai curries, authentic Japanese ramen, and fresh tropical delicacies.'
      },
      {
        number: 3,
        title: 'Pristine Beaches & Tropical Escapes',
        description: 'Lounge on the overwater villas of the Maldives, limestone karsts of Ha Long Bay, and lush jungle sanctuaries in Bali and Thailand.'
      },
      {
        number: 4,
        title: 'Warm & Welcoming Hospitality',
        description: 'Experience the world-renowned generosity and kindness of Asian cultures, ensuring every traveler feels like family.'
      },
      {
        number: 5,
        title: 'Extraordinary Value & Luxury Experiences',
        description: 'Enjoy world-class 5-star resorts, private villas, and personalized guided tours at surprisingly accessible price points.'
      }
    ],
    popularSpots: [
      { name: 'Ubud & Uluwatu', country: 'Indonesia', image: '/image/destinations/asia_bali.jpg', price: 1150, duration: '8 Days', rating: 9.2 },
      { name: 'Kyoto & Tokyo', country: 'Japan', image: '/image/destinations/asia_kyoto.jpg', price: 2100, duration: '9 Days', rating: 9.6 },
      { name: 'Ha Long Bay & Hanoi', country: 'Vietnam', image: '/image/destinations/asia_vietnam.jpg', price: 1250, duration: '7 Days', rating: 9.0 },
      { name: 'Phuket & Phi Phi', country: 'Thailand', image: '/image/destinations/asia_thailand.jpg', price: 1320, duration: '8 Days', rating: 9.1 },
      { name: 'Baa Atoll Lagoon', country: 'Maldives', image: '/image/destinations/asia_maldives.jpg', price: 2400, duration: '6 Days', rating: 9.8 }
    ]
  },
  'Europe': {
    id: 'europe',
    name: 'Europe',
    slug: 'Europe',
    tagline: 'Timeless art, alpine peaks & romantic Mediterranean shores',
    heroImage: '/image/destinations/europe_swiss.jpg',
    reasonsToVisit: [
      {
        number: 1,
        title: 'Iconic Alpine Scenery & Mountain Adventures',
        description: 'Hike through Swiss peaks, ride panoramic glacier trains, and marvel at emerald glacial lakes and snow-capped peaks.'
      },
      {
        number: 2,
        title: 'Sun-Drenched Mediterranean Coastlines',
        description: 'Explore the whitewashed cliffs of Santorini, the colorful fishing villages of Amalfi, and azure French Riviera waters.'
      },
      {
        number: 3,
        title: 'Centuries of Art, Architecture & History',
        description: 'Wander through ancient Roman ruins, Gothic cathedrals, Renaissance museums, and medieval fairytale castles.'
      },
      {
        number: 4,
        title: 'World-Renowned Gastronomy & Wine Regions',
        description: 'Sip Tuscan Chianti, taste authentic French pastries, and savor Swiss fondue in charming historic towns.'
      },
      {
        number: 5,
        title: 'Effortless Cross-Country Travel',
        description: 'High-speed trains effortlessly connect world capitals, allowing multi-country explorations in comfort.'
      }
    ],
    popularSpots: [
      { name: 'Swiss Alps & Zermatt', country: 'Switzerland', image: '/image/destinations/europe_swiss.jpg', price: 2450, duration: '7 Days', rating: 9.5 },
      { name: 'Santorini & Mykonos', country: 'Greece', image: '/image/destinations/europe_santorini.jpg', price: 1850, duration: '8 Days', rating: 9.4 },
      { name: 'Skogafoss & Ring Road', country: 'Iceland', image: '/image/hero/arctic_wonders.jpg', price: 1890, duration: '8 Days', rating: 8.9 }
    ]
  },
  'Africa': {
    id: 'africa',
    name: 'Africa',
    slug: 'Africa',
    tagline: 'Majestic wildlife, boundless savannas & ancient civilizations',
    heroImage: '/image/destinations/africa_serengeti.jpg',
    reasonsToVisit: [
      {
        number: 1,
        title: 'The World’s Greatest Wildlife Safaris',
        description: 'Witness the Great Migration, encounter the Big Five up close, and sleep in luxury tented camps under star-filled skies.'
      },
      {
        number: 2,
        title: 'Pyramids of Giza & Ancient Nile Wonders',
        description: 'Stand in awe of 4,500-year-old pyramids, the Sphinx, and cruise the legendary river Nile in Egypt.'
      },
      {
        number: 3,
        title: 'Dramatic Landscapes & Natural Wonders',
        description: 'From Mount Kilimanjaro’s snowy peak to Victoria Falls and the red sand dunes of the Namib Desert.'
      },
      {
        number: 4,
        title: 'Rich Tribal Traditions & Vibrant Cultures',
        description: 'Connect with Maasai and Samburu communities and experience deep-rooted music, dance, and craft.'
      },
      {
        number: 5,
        title: 'Pristine Indian Ocean Beaches & Coral Atolls',
        description: 'Relax on Zanzibar’s spice-scented white sands after an exhilarating savanna safari.'
      }
    ],
    popularSpots: [
      { name: 'Serengeti & Ngorongoro', country: 'Tanzania', image: '/image/destinations/africa_serengeti.jpg', price: 2850, duration: '8 Days', rating: 9.7 },
      { name: 'Giza & Luxor Nile Cruise', country: 'Egypt', image: '/image/destinations/africa_egypt.jpg', price: 1650, duration: '7 Days', rating: 9.3 }
    ]
  },
  'Australia': {
    id: 'australia',
    name: 'Australia',
    slug: 'Australia',
    tagline: 'Sun-kissed harbors, vibrant coral reefs & ancient Outback red earth',
    heroImage: '/image/destinations/australia_sydney.jpg',
    reasonsToVisit: [
      {
        number: 1,
        title: 'The Great Barrier Reef Living Wonder',
        description: 'Snorkel and dive the largest coral reef system on Earth teeming with thousands of vibrant marine species.'
      },
      {
        number: 2,
        title: 'Iconic Sydney Harbor & Coastal Lifestyle',
        description: 'Climb the Harbor Bridge, catch a show at the Opera House, and surf the waves at world-famous Bondi Beach.'
      },
      {
        number: 3,
        title: 'Unique Wildlife You Won’t Find Anywhere Else',
        description: 'Cuddle koalas, feed friendly kangaroos, and spot playful platypuses and quokkas in their natural habitats.'
      },
      {
        number: 4,
        title: 'Ancient Aboriginal Culture & Uluru Red Heart',
        description: 'Discover the world’s oldest continuous living culture and sacred sandstone monoliths in the Red Centre.'
      },
      {
        number: 5,
        title: 'World-Class Coffee & Gastronomic Innovation',
        description: 'Enjoy Melbourne’s laneway cafe culture, Sydney waterfront dining, and award-winning Barossa Valley wines.'
      }
    ],
    popularSpots: [
      { name: 'Sydney & Blue Mountains', country: 'Australia', image: '/image/destinations/australia_sydney.jpg', price: 2150, duration: '9 Days', rating: 9.1 },
      { name: 'Great Barrier Reef & Whitsundays', country: 'Australia', image: '/image/destinations/australia_barrier_reef.jpg', price: 2350, duration: '8 Days', rating: 9.5 }
    ]
  },
  'New Zeland': {
    id: 'new-zeland',
    name: 'New Zeland',
    slug: 'New Zeland',
    tagline: 'Majestic fiords, geothermal geysers & Middle-earth adventures',
    heroImage: '/image/destinations/new_zealand_fjords.jpg',
    reasonsToVisit: [
      {
        number: 1,
        title: 'Milford Sound & Breathtaking Fiordland',
        description: 'Cruise through deep glacial fiords, beneath thousand-meter waterfalls and mist-shrouded mountain peaks.'
      },
      {
        number: 2,
        title: 'World Adventure Capital of Queenstown',
        description: 'From helicopter glacier landings to jet boating through narrow canyons and world-class ski slopes.'
      },
      {
        number: 3,
        title: 'Real-Life Middle-earth & Hobbiton',
        description: 'Step into the Shire, visit movie film locations, and explore untouched volcanic valleys.'
      },
      {
        number: 4,
        title: 'Maori Culture & Geothermal Springs in Rotorua',
        description: 'Experience traditional Haka ceremonies, bubbling mud pools, and natural hot spring healing waters.'
      },
      {
        number: 5,
        title: 'Pristine Night Skies & Stargazing Reserves',
        description: 'Gaze into the Southern Cross at Lake Tekapo, one of the world’s largest Dark Sky Reserves.'
      }
    ],
    popularSpots: [
      { name: 'Milford Sound & Fiordland', country: 'New Zealand', image: '/image/destinations/new_zealand_fjords.jpg', price: 1980, duration: '8 Days', rating: 9.3 },
      { name: 'Queenstown & Southern Alps', country: 'New Zealand', image: '/image/destinations/new_zealand_queenstown.jpg', price: 2100, duration: '7 Days', rating: 9.6 }
    ]
  }
};

export const api = {
  async getStats(): Promise<StatsData> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      return data.data;
    } catch {
      return FALLBACK_STATS;
    }
  },

  async getTours(params?: { region?: string; featured?: boolean; search?: string }): Promise<Tour[]> {
    try {
      const query = new URLSearchParams();
      if (params?.region) query.append('region', params.region);
      if (params?.featured) query.append('featured', 'true');
      if (params?.search) query.append('search', params.search);

      const res = await fetch(`${API_BASE}/tours?${query.toString()}`);
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      return data.data;
    } catch {
      return FALLBACK_HERO_TOURS;
    }
  },

  async getRegion(regionName: string): Promise<DestinationRegion> {
    try {
      const res = await fetch(`${API_BASE}/destinations/${encodeURIComponent(regionName)}`);
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      return data.data;
    } catch {
      return FALLBACK_REGIONS[regionName] || FALLBACK_REGIONS['Asia'];
    }
  },

  async getReviews(): Promise<Review[]> {
    try {
      const res = await fetch(`${API_BASE}/reviews`);
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      return data.data;
    } catch {
      return [
        {
          id: 'rev-1',
          name: 'Elena Rostova',
          avatar: '/image/reviews/avatar1.jpg',
          location: 'London, UK',
          tourName: 'Incan Odyssey & Machu Picchu Citadel',
          rating: 5,
          date: '2 weeks ago',
          comment: 'The sunrise view over Machu Picchu took our breath away. Everything from the Vistadome train to the private guide was flawlessly organized by FLY FLY. A once in a lifetime trip!',
          verified: true
        },
        {
          id: 'rev-2',
          name: 'Marcus Vance',
          avatar: '/image/reviews/avatar2.jpg',
          location: 'San Francisco, CA',
          tourName: 'Hawaii Beach & Sunset Paradise',
          rating: 5,
          date: '1 month ago',
          comment: 'We booked using the 15% discount for early travelers and it was the best decision ever. The sunset catamaran sail and private helicopter flight made our honeymoon unforgettable.',
          verified: true
        },
        {
          id: 'rev-3',
          name: 'Sophia Chen',
          avatar: '/image/reviews/avatar3.jpg',
          location: 'Sydney, Australia',
          tourName: 'Arctic Wonders & Northern Lights',
          rating: 5,
          date: '3 weeks ago',
          comment: 'The Northern Lights appeared on our second night right above our glass pod lodge. Standing behind the Skógafoss waterfall was simply magical. Outstanding travel team!',
          verified: true
        }
      ];
    }
  },

  async createBooking(payload: BookingPayload): Promise<BookingResponse> {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Booking failed');
      const data = await res.json();
      return data.data;
    } catch {
      // Local calculation fallback
      const basePrice = 1450;
      const numGuests = payload.passengers || 1;
      const subtotal = basePrice * numGuests;
      const discount = 0.15;
      const discountAmount = Math.round(subtotal * discount);
      return {
        bookingId: `FLY-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`,
        tourId: payload.tourId,
        tourTitle: 'Custom World Tour Odyssey',
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone || '+1 (555) 019-2834',
        travelDate: payload.travelDate,
        passengers: numGuests,
        promoCodeApplied: 'FLYWORLD15 (15% OFF)',
        discountAmount,
        total: subtotal - discountAmount,
        notes: payload.notes || '',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString()
      };
    }
  },

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error('Subscription failed');
      return await res.json();
    } catch {
      return {
        success: true,
        message: 'You have been subscribed to exclusive FLY FLY travel offers and secrets!'
      };
    }
  }
};
