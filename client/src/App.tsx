import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { StatsSection } from '@/components/stats/StatsSection';
import { AboutSection } from '@/components/about/AboutSection';
import { DestinationsSection } from '@/components/destinations/DestinationsSection';
import { ExclusiveToursSection } from '@/components/tours/ExclusiveToursSection';
import { TourDetailsModal } from '@/components/tours/TourDetailsModal';
import { ReviewsSection } from '@/components/reviews/ReviewsSection';
import { BookingModal } from '@/components/booking/BookingModal';
import { PartnerPerksModal } from '@/components/partners/PartnerPerksModal';
import { ImageModal } from '@/components/gallery/ImageModal';
import { Footer } from '@/components/footer/Footer';
import { Tour, StatsData, Review } from '@/types';
import { api, FALLBACK_STATS, FALLBACK_HERO_TOURS } from '@/services/api';

export function App() {
  const [stats, setStats] = useState<StatsData>(FALLBACK_STATS);
  const [tours, setTours] = useState<Tour[]>(FALLBACK_HERO_TOURS);
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<string | undefined>(undefined);
  const [activeTourDetail, setActiveTourDetail] = useState<Tour | null>(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  
  // Lightbox
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, toursData, reviewsData] = await Promise.all([
          api.getStats(),
          api.getTours(),
          api.getReviews(),
        ]);
        if (statsData) setStats(statsData);
        if (toursData && toursData.length > 0) setTours(toursData);
        if (reviewsData) setReviews(reviewsData);
      } catch (err) {
        console.error('Error fetching data from API:', err);
      }
    }
    loadData();
  }, []);

  const handleOpenBooking = (tourId?: string) => {
    setSelectedTourId(tourId);
    setIsBookingOpen(true);
  };

  const handleSelectTour = (tour: Tour) => {
    setActiveTourDetail(tour);
  };

  const handleBookFromDetails = (tourId: string) => {
    setActiveTourDetail(null);
    setSelectedTourId(tourId);
    setIsBookingOpen(true);
  };

  const handleApplyPromoAndBook = () => {
    setIsPartnerModalOpen(false);
    setIsBookingOpen(true);
  };

  const handleSelectGallery = (src: string, title: string) => {
    setLightboxImage(src);
    setLightboxTitle(title);
  };

  const handleAddReview = (newReview: {
    name: string;
    rating: number;
    comment: string;
    tourName: string;
    location: string;
  }) => {
    const createdReview: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      avatar: '/image/reviews/avatar1.jpg',
      location: newReview.location,
      tourName: newReview.tourName,
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      verified: true
    };
    setReviews((prev) => [createdReview, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#031422] text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Fixed Navigation Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Section with Machu Picchu & Hawaii Slide */}
      <HeroSection
        heroTours={tours}
        onOpenBooking={handleOpenBooking}
        onSelectTour={handleSelectTour}
      />

      {/* Wave Transition + Statistics + Tilted 3D Photo Stack */}
      <StatsSection
        stats={stats}
        onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
        onSelectGalleryImage={handleSelectGallery}
      />

      {/* About Us Showcase with Agency Lounge & Core Values */}
      <AboutSection />

      {/* Destinations with Asian/Global Tabs & 5 Reasons */}
      <DestinationsSection onOpenBooking={handleOpenBooking} />

      {/* Exclusive Tour Package Catalogue */}
      <ExclusiveToursSection
        tours={tours}
        onOpenBooking={handleOpenBooking}
        onSelectTour={handleSelectTour}
      />

      {/* Reviews & Testimonials with submission */}
      <ReviewsSection
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      {/* Platform Footer with Newsletter */}
      <Footer />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTourId={selectedTourId}
        tours={tours}
      />

      <TourDetailsModal
        tour={activeTourDetail}
        isOpen={!!activeTourDetail}
        onClose={() => setActiveTourDetail(null)}
        onBookTour={handleBookFromDetails}
      />

      <PartnerPerksModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        onApplyPromoAndBook={handleApplyPromoAndBook}
      />

      <ImageModal
        isOpen={!!lightboxImage}
        imageSrc={lightboxImage}
        imageTitle={lightboxTitle}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
}

export default App;
