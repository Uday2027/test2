export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  location: string;
  region: 'Asia' | 'Europe' | 'Africa' | 'Australia' | 'New Zeland' | 'Americas';
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  duration: string;
  groupSize: string;
  image: string;
  featured: boolean;
  heroSlide?: boolean;
  tag?: string;
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; desc: string }[];
  included: string[];
}

export interface DestinationRegion {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  heroImage: string;
  reasonsToVisit: {
    number: number;
    title: string;
    description: string;
  }[];
  popularSpots: {
    name: string;
    country: string;
    image: string;
    price: number;
    duration: string;
    rating: number;
  }[];
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  location: string;
  tourName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const STATS = {
  yearsOfExperience: 10,
  satisfiedClients: 5000,
  countriesCovered: 100,
  expertGuides: 45,
  partnerDiscountsPercent: 15,
  limitedSpotsLeft: 18
};

export const TOURS_DATA: Tour[] = [
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
      { day: 3, title: 'Turtle Reef Catamaran & Snorkeling', desc: 'Morning catamaran expedition to crystal clear reefs with marine biologists.' },
      { day: 4, title: 'Haleakala Volcano Sunrise Experience', desc: 'Watch dawn break above the clouds at 10,000 feet, followed by downhill cycling.' },
      { day: 5, title: 'Traditional Polynesian Cultural Luau', desc: 'Feast on authentic Hawaiian cuisine with fire dancers and live music.' },
      { day: 6, title: 'Private Helicopter Island Flight', desc: 'Breathtaking bird’s-eye view of Jurassic Falls and dramatic sea cliffs.' },
      { day: 7, title: 'Mahalo Farewell & Departure', desc: 'Morning yoga by the ocean, souvenir shopping, and VIP airport transfer.' }
    ],
    included: ['All 5-Star Hotel Accommodations', 'Daily Gourmet Breakfasts & 3 Dinners', 'All Guided Excursions & Entry Permits', 'Private Luxury Transportation', 'English/Multi-language Expert Tour Director']
  },
  {
    id: 'arctic-wonders-iceland',
    title: 'Arctic Wonders & Northern Lights',
    subtitle: 'Glacier lagoons, Skogafoss waterfalls & geothermal springs',
    country: 'Iceland',
    location: 'Skogafoss & Arctic Ring',
    region: 'Europe',
    rating: 8.9,
    reviewCount: 412,
    price: 1890,
    originalPrice: 2200,
    duration: '8 Days / 7 Nights',
    image: '/image/hero/arctic_wonders.jpg',
    featured: true,
    heroSlide: true,
    tag: 'Must Visit',
    groupSize: 'Max 10 People',
    description: 'Traverse Iceland’s otherworldly landscapes, from the roaring cascades of Skógafoss to glistening diamond icebergs and midnight auroras.',
    highlights: ['Skógafoss and Seljalandsfoss waterfall exploration', 'Glacier hiking with crampons & ice cave expedition', 'Relaxation at the Blue Lagoon & Sky Lagoon', 'Nightly Northern Lights hunting tours'],
    itinerary: [
      { day: 1, title: 'Reykjavik Arrival & Sky Lagoon Soak', desc: 'Arrival at Keflavik and seven-step spa ritual overlooking the Atlantic.' },
      { day: 2, title: 'Golden Circle & Geysir Eruptions', desc: 'Thingvellir National Park, Gullfoss waterfall, and Strokkur geyser.' },
      { day: 3, title: 'South Coast & Skógafoss Roar', desc: 'Stand behind waterfalls and walk on the black sands of Reynisfjara.' },
      { day: 4, title: 'Vatnajökull Glacier & Crystal Ice Caves', desc: 'Equip crampons to venture inside illuminated blue subterranean ice chambers.' },
      { day: 5, title: 'Jökulsárlón Glacier Lagoon Zodiac Cruise', desc: 'Navigate between floating icebergs and spot seals at Diamond Beach.' },
      { day: 6, title: 'East Fjords & Wildlife Safari', desc: 'Spectacular coastal drives, wild reindeer sightings, and cozy fishing villages.' },
      { day: 7, title: 'Thermal Valley & Aurora Dinner', desc: 'Traditional Icelandic lamb stew and aurora photography masterclass.' },
      { day: 8, title: 'Farewell Reykjavik', desc: 'Sightseeing in old town and transfer to Keflavik.' }
    ],
    included: ['Boutique Wilderness Hotels & Aurora Pods', 'Super Jeep 4x4 Transportation', 'Ice Cave Gear & Certified Guides', 'All Entrance Fees and Lagoon Passes']
  },
  {
    id: 'machu-picchu-odyssey',
    title: 'Incan Odyssey & Machu Picchu Citadel',
    subtitle: 'Sacred Valley temples, Andean peaks & lost ancient wonder',
    country: 'Peru',
    location: 'Cusco & Machu Picchu',
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
    highlights: ['Vistadome panoramic train ride to Aguas Calientes', 'Sunrise guided tour of Machu Picchu ruins', 'Ollantaytambo & Pisac ancient stone fortresses', 'Cusco historic culinary & chocolate workshops'],
    itinerary: [
      { day: 1, title: 'Cusco Imperial Welcome', desc: 'Acclimatize in Cusco with coca tea and historic walking tour.' },
      { day: 2, title: 'Sacred Valley of the Incas', desc: 'Visit Pisac artisan market and the fortress of Ollantaytambo.' },
      { day: 3, title: 'Panoramic Train & Machu Picchu Grand Tour', desc: 'Scenic railway journey through the cloud forest and guided ruins discovery.' },
      { day: 4, title: 'Huayna Picchu Peak Climb', desc: 'Early morning hike for panoramic views above the clouds.' },
      { day: 5, title: 'Maras Salt Mines & Moray Concentric Terraces', desc: 'Explore thousands of pink terraced salt pans and agricultural laboratories.' },
      { day: 6, title: 'Departure with Peruvian Memories', desc: 'Farewell breakfast and airport connection.' }
    ],
    included: ['Luxury Train Tickets', 'Official Machu Picchu & Inca Trail Passes', 'Boutique Heritage Hotels', 'Full-time Historian Guides']
  },
  {
    id: 'bali-spiritual-sanctuary',
    title: 'Bali Emerald Terraces & Island Serenity',
    subtitle: 'Ubud sacred rice terraces, sea temples & tropical paradise',
    country: 'Indonesia',
    location: 'Ubud & Uluwatu, Bali',
    region: 'Asia',
    rating: 9.2,
    reviewCount: 460,
    price: 1150,
    originalPrice: 1400,
    duration: '8 Days / 7 Nights',
    image: '/image/destinations/asia_bali.jpg',
    featured: true,
    tag: 'Bestseller',
    groupSize: 'Max 12 People',
    description: 'Experience Bali’s enchanting spirit with lush jungle retreats in Ubud, sacred monkey sanctuaries, clifftop Kecak fire dances, and serene Nusa Penida beaches.',
    highlights: ['Tegalalang Rice Terraces sunrise walk & jungle swing', 'Sacred Tirta Empul water purification blessing', 'Clifftop Uluwatu Temple sunset & Kecak dance', 'Speedboat day trip to Nusa Penida Kelingking Beach'],
    itinerary: [
      { day: 1, title: 'Arrival in Denpasar & Ubud Jungle Resort', desc: 'Transfer to private pool villa overlooking the rainforest.' },
      { day: 2, title: 'Ubud Artisans, Terraces & Sacred Water Temple', desc: 'Explore rice fields and receive a traditional Balinese blessing.' },
      { day: 3, title: 'Mount Batur Volcano Sunrise Trek', desc: 'Hike to the crater for breakfast cooked over volcanic steam.' },
      { day: 4, title: 'Nusa Penida Island Expedition', desc: 'Visit the famous T-Rex shaped Kelingking cliff and Broken Beach.' },
      { day: 5, title: 'Traditional Cooking Class & Spa Day', desc: 'Learn Balinese spice secrets and enjoy an organic floral bath.' },
      { day: 6, title: 'Seminyak & Canggu Sunset Vibes', desc: 'Beach club relaxation, surfing lessons, and vibrant night markets.' },
      { day: 7, title: 'Uluwatu Clifftops & Seafood Feast at Jimbaran', desc: 'Dramatic coastal temple views and fresh seafood on the sand.' },
      { day: 8, title: 'Farewell Bali', desc: 'Private airport transfer.' }
    ],
    included: ['Private Villa Accommodations', 'Private Chauffeur & Air-conditioned Vehicle', 'All Sightseeing & Island Boat Transfers', 'Daily Breakfasts + Special Seafood Dinner']
  },
  {
    id: 'kyoto-tokyo-japan',
    title: 'Imperial Kyoto & Ancient Cherry Blossom Paths',
    subtitle: 'Golden pavilions, bamboo groves, geisha quarters & bullet trains',
    country: 'Japan',
    location: 'Kyoto & Nara',
    region: 'Asia',
    rating: 9.6,
    reviewCount: 680,
    price: 2100,
    originalPrice: 2450,
    duration: '9 Days / 8 Nights',
    image: '/image/destinations/asia_kyoto.jpg',
    featured: true,
    tag: 'Cultural Wonder',
    groupSize: 'Max 10 People',
    description: 'Immerse yourself in timeless Japanese heritage. Walk through thousands of vermilion Torii gates at Fushimi Inari, meditate in Zen rock gardens, and taste authentic kaiseki feasts.',
    highlights: ['Fushimi Inari Shrine & Arashiyama Bamboo Grove', 'Traditional Matcha Tea Ceremony with Geisha host', 'Bullet Train (Shinkansen) first-class passes', 'Nara Friendly Deer Park & Todai-ji Giant Buddha'],
    itinerary: [
      { day: 1, title: 'Arrival in Kyoto & Gion Lantern Walk', desc: 'Check in to a luxury ryokan and evening stroll in historic Gion.' },
      { day: 2, title: 'Kinkaku-ji Golden Pavilion & Zen Gardens', desc: 'Visit iconic gold-leaf temple and Ryoan-ji rock garden.' },
      { day: 3, title: 'Arashiyama Bamboo Forest & Monkey Mountain', desc: 'Rickshaw ride through emerald bamboo and historic bridges.' },
      { day: 4, title: 'Fushimi Inari 10,000 Gates & Sake Tasting', desc: 'Hike through sacred Torii pathways and taste Fushimi brewery sakes.' },
      { day: 5, title: 'Day Trip to Nara Ancient Capital', desc: 'Feed sacred bowing sika deer and gaze at the Great Bronze Buddha.' },
      { day: 6, title: 'Kaiseki Masterclass & Kimono Experience', desc: 'Wear authentic silk kimonos and dine on multi-course cuisine.' },
      { day: 7, title: 'Tea Master Ceremony in Uji', desc: 'Journey to the matcha heartland for private tea harvest and whisking.' },
      { day: 8, title: 'Kiyomizu-dera Wooden Terrace Sunset', desc: 'Panoramic view over Kyoto hillside from un-nailed wooden stage.' },
      { day: 9, title: 'Sayonara Japan Departure', desc: 'Transfer to Kansai International.' }
    ],
    included: ['Luxury Ryokan with Onsen & 5-Star City Hotels', 'JR Bullet Train Passes', 'All Cultural Masterclasses & Entry Passes', 'Dedicated Bilingual Historian Guide']
  },
  {
    id: 'swiss-alps-majesty',
    title: 'Swiss Alps Majesty & Glacier Express',
    subtitle: 'Zermatt Matterhorn, Interlaken peaks & emerald alpine lakes',
    country: 'Switzerland',
    location: 'Zermatt & Jungfrau Region',
    region: 'Europe',
    rating: 9.5,
    reviewCount: 390,
    price: 2450,
    originalPrice: 2800,
    duration: '7 Days / 6 Nights',
    image: '/image/destinations/europe_swiss.jpg',
    featured: true,
    tag: 'Luxury Alpine',
    groupSize: 'Max 12 People',
    description: 'Ride world-famous panoramic trains through alpine meadows, gaze at the majestic Matterhorn, and explore high-altitude glacier palaces.',
    highlights: ['Glacier Express first class panoramic railway', 'Jungfraujoch Top of Europe 3,454m observatory', 'Matterhorn Glacier Paradise cableway ride', 'Swiss cheese fondue and Lindt chocolate atelier'],
    itinerary: [
      { day: 1, title: 'Zurich Arrival & Lucerne Lakeside', desc: 'Chapel Bridge walk and sunset steamboat cruise on Lake Lucerne.' },
      { day: 2, title: 'Interlaken & Lauterbrunnen 72 Waterfalls', desc: 'Wander through the real-life fairytale valley of roaring waterfalls.' },
      { day: 3, title: 'Jungfraujoch Top of Europe', desc: 'Cogwheel train into the high Alps, Ice Palace, and Aletsch Glacier.' },
      { day: 4, title: 'Glacier Express Scenic Train Journey', desc: 'Cross dramatic viaducts and spiral tunnels with champagne service.' },
      { day: 5, title: 'Zermatt & Matterhorn Sunrise Views', desc: 'Ascend to Gornergrat for 360-degree views of 29 four-thousand-meter peaks.' },
      { day: 6, title: 'Alpine Wellness & Fondue Evening', desc: 'Thermal infinity pools facing snow peaks and traditional cheese dinner.' },
      { day: 7, title: 'Geneva / Zurich Departure', desc: 'Scenic Swiss Rail transfer to international departure.' }
    ],
    included: ['Swiss Travel Pass First Class', 'Alpine 5-Star Boutique Chalets', 'All Mountain Excursions & Cogwheel Trains', 'Daily Breakfasts & Swiss Fondue Dinners']
  },
  {
    id: 'serengeti-safari-migration',
    title: 'Serengeti Great Migration & Ngorongoro Crater',
    subtitle: 'Big Five safari, boundless savannas & luxury tented camps',
    country: 'Tanzania',
    location: 'Serengeti & Ngorongoro',
    region: 'Africa',
    rating: 9.7,
    reviewCount: 295,
    price: 2850,
    originalPrice: 3300,
    duration: '8 Days / 7 Nights',
    image: '/image/destinations/africa_serengeti.jpg',
    featured: true,
    tag: 'Wildlife Adventure',
    groupSize: 'Max 6 People per Jeep',
    description: 'Witness nature’s greatest spectacle with private custom 4x4 safari vehicles, expert trackers, hot air balloon flights over wildebeest herds, and five-star luxury tented lodges.',
    highlights: ['Serengeti sunrise hot air balloon safari & champagne bush breakfast', 'Big 5 tracking in Ngorongoro Crater caldera', 'Authentic Maasai tribal cultural exchange', 'Luxury wilderness glamping under African starry skies'],
    itinerary: [
      { day: 1, title: 'Kilimanjaro Arrival & Arusha Oasis', desc: 'Private arrival transfer and orientation dinner at coffee lodge.' },
      { day: 2, title: 'Tarangire National Park & Giant Baobabs', desc: 'Huge elephant herds and iconic tree-climbing lions.' },
      { day: 3, title: 'Ngorongoro Crater Floor Safari', desc: 'Descend 600m into the caldera to spot black rhinos, lions, and flamingos.' },
      { day: 4, title: 'Serengeti Endless Plains', desc: 'Game drive tracking leopards and cheetahs in central Seronera valley.' },
      { day: 5, title: 'Hot Air Balloon Flight & Migration Crossing', desc: 'Drift silently over river crossings and herds of millions.' },
      { day: 6, title: 'Maasai Village & Sunset Bush Sundowner', desc: 'Learn tribal traditions and celebrate golden hour with cocktails in the wild.' },
      { day: 7, title: 'Lake Manyara Tree-Climbing Lions', desc: 'Scenic rift valley landscapes and canopy walkway.' },
      { day: 8, title: 'Kilimanjaro Departure', desc: 'Fly back with once-in-a-lifetime wildlife memories.' }
    ],
    included: ['All Inclusive Luxury Tented Camps & Lodges', 'Custom 4x4 Pop-up Safari Cruisers', 'All National Park & Conservation Fees', 'Hot Air Balloon Safari Pass included']
  },
  {
    id: 'milford-sound-fiords',
    title: 'Milford Sound Fiords & Southern Alps Expedition',
    subtitle: 'Queenstown adventures, glacier valleys & pristine fiords',
    country: 'New Zealand',
    location: 'Milford Sound & Queenstown',
    region: 'New Zeland',
    rating: 9.3,
    reviewCount: 340,
    price: 1980,
    originalPrice: 2300,
    duration: '8 Days / 7 Nights',
    image: '/image/destinations/new_zealand_fjords.jpg',
    featured: true,
    tag: 'Pure Nature',
    groupSize: 'Max 12 People',
    description: 'Discover the Eighth Wonder of the World. Cruise towering fiords, hike ancient beech rainforests, and experience Queenstown’s adrenaline and world-class pinot noir.',
    highlights: ['Overnight boutique cruise on Milford Sound', 'Helicopter glacier landing in Mount Aspiring National Park', 'Queenstown TSS Earnslaw vintage steamship dinner', 'Lord of the Rings filming locations & Glenorchy trail'],
    itinerary: [
      { day: 1, title: 'Queenstown Arrival & Skyline Gondola', desc: 'Gondola ride for panoramic views over Lake Wakatipu and The Remarkables.' },
      { day: 2, title: 'Scenic Road to Milford Sound & Chasm Walks', desc: 'Drive through the Homer Tunnel and lush temperate rainforests.' },
      { day: 3, title: 'Milford Sound Wilderness Cruise & Kayaking', desc: 'Get showered by Stirling Falls and encounter fur seals and dolphins.' },
      { day: 4, title: 'Fiordland Glowworm Caves Exploration', desc: 'Boat into subterranean limestone caverns illuminated by thousands of glowworms.' },
      { day: 5, title: 'Arrowtown Gold Mining & Central Otago Wine Tour', desc: 'Historic gold rush town and tasting world-renowned Pinot Noir.' },
      { day: 6, title: 'Helicopter Glacier Landing & Alpine Picnic', desc: 'Fly over snow-capped ridges and touch down on pristine blue ice.' },
      { day: 7, title: 'Glenorchy Dart River Jet Safari', desc: 'Jet boat wilderness tour through pristine national park river canyons.' },
      { day: 8, title: 'Farewell New Zealand', desc: 'Departure from Queenstown.' }
    ],
    included: ['Boutique Lakeview Hotels & Overnight Ship Berth', 'All Adventure Excursions & Scenic Flights', 'Private Transportation with Local Driver-Guide', 'Gourmet Wine Tasting & Farm Feasts']
  },
  {
    id: 'sydney-great-barrier-reef',
    title: 'Sydney Harbor to Great Barrier Reef Wonders',
    subtitle: 'Iconic harbor skyline, Whitsunday white sands & coral reefs',
    country: 'Australia',
    location: 'Sydney & Great Barrier Reef',
    region: 'Australia',
    rating: 9.1,
    reviewCount: 380,
    price: 2150,
    originalPrice: 2500,
    duration: '9 Days / 8 Nights',
    image: '/image/destinations/australia_sydney.jpg',
    featured: true,
    tag: 'Iconic Coast',
    groupSize: 'Max 12 People',
    description: 'From the glittering arches of the Sydney Opera House and Bondi surf to the vibrant living corals and turquoise lagoons of the Great Barrier Reef.',
    highlights: ['Sydney Opera House VIP backstage tour & Harbor Bridge climb', 'Catamaran cruise to Outer Great Barrier Reef pontoon', 'Whitehaven Beach helicopter scenic flight over Heart Reef', 'Koala and kangaroo sanctuary close encounters'],
    itinerary: [
      { day: 1, title: 'Sydney Harbor Arrival & Sunset Cruise', desc: 'Welcome cruise beneath the Harbor Bridge with champagne.' },
      { day: 2, title: 'Opera House & Bondi to Coogee Coastal Walk', desc: 'Historic Rocks district tour and famous Pacific ocean cliff walk.' },
      { day: 3, title: 'Blue Mountains & Three Sisters Rock Formation', desc: 'Scenic railway into eucalyptus canyons and wildlife encounters.' },
      { day: 4, title: 'Flight to Cairns / Tropical North Queensland', desc: 'Arrive in the tropical paradise gateway to the coral sea.' },
      { day: 5, title: 'Outer Great Barrier Reef Snorkel & Scuba', desc: 'Snorkel among giant clams, clownfish, and sea turtles on pristine reef walls.' },
      { day: 6, title: 'Daintree Rainforest & Cape Tribulation', desc: 'World’s oldest tropical rainforest and crocodile river boat safari.' },
      { day: 7, title: 'Whitsunday Islands & Whitehaven Beach', desc: 'Walk on 98% pure white silica sand and swim in turquoise waters.' },
      { day: 8, title: 'Heart Reef Helicopter Tour & Sunset Dinner', desc: 'Fly over natural heart-shaped reef and celebratory seafood dinner.' },
      { day: 9, title: 'Departure with Australian Memories', desc: 'Transfer to international flight.' }
    ],
    included: ['Internal Flights Sydney to Cairns', '5-Star Beachfront & Harbor Hotels', 'All Marine Park Reef Permits & Gear', 'Expert Marine Biologist & Local Guides']
  }
];

export const REGIONS_DATA: Record<string, DestinationRegion> = {
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

export const REVIEWS_DATA: Review[] = [
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
