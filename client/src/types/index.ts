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

export interface DestinationReason {
  number: number;
  title: string;
  description: string;
}

export interface PopularSpot {
  name: string;
  country: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
}

export interface DestinationRegion {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  heroImage: string;
  reasonsToVisit: DestinationReason[];
  popularSpots: PopularSpot[];
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

export interface StatsData {
  yearsOfExperience: number;
  satisfiedClients: number;
  countriesCovered: number;
  expertGuides: number;
  partnerDiscountsPercent: number;
  limitedSpotsLeft: number;
}

export interface BookingPayload {
  tourId: string;
  fullName: string;
  email: string;
  phone?: string;
  travelDate: string;
  passengers: number;
  promoCode?: string;
  notes?: string;
}

export interface BookingResponse {
  bookingId: string;
  tourId: string;
  tourTitle: string;
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  passengers: number;
  promoCodeApplied: string | null;
  discountAmount: number;
  total: number;
  notes: string;
  status: string;
  createdAt: string;
}
