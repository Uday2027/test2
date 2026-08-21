import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Star, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tour } from '@/types';

interface HeroSectionProps {
  heroTours: Tour[];
  onOpenBooking: (tourId?: string) => void;
  onSelectTour: (tour: Tour) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroTours,
  onOpenBooking,
  onSelectTour,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.2 }
      )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.7 },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const tours = heroTours.length > 0 ? heroTours : [
    {
      id: 'hawaii-beach-escape',
      title: 'Hawaii Beach',
      subtitle: 'USA, Hawaii',
      country: 'USA',
      location: 'Hawaii Beach',
      region: 'Americas' as const,
      rating: 7.8,
      reviewCount: 320,
      price: 1450,
      duration: '7 Days',
      groupSize: '12 Max',
      image: '/image/hero/hawaii_beach.jpg',
      featured: true,
      description: 'Golden sands and turquoise Pacific shores',
      highlights: [],
      itinerary: [],
      included: []
    },
    {
      id: 'arctic-wonders-iceland',
      title: 'Arctic Wonders',
      subtitle: 'Iceland, Skogafoss',
      country: 'Iceland',
      location: 'Skogafoss',
      region: 'Europe' as const,
      rating: 8.9,
      reviewCount: 412,
      price: 1890,
      duration: '8 Days',
      groupSize: '10 Max',
      image: '/image/hero/arctic_wonders.jpg',
      featured: true,
      description: 'Glacier lagoons & northern lights',
      highlights: [],
      itinerary: [],
      included: []
    },
    {
      id: 'machu-picchu-odyssey',
      title: 'Incan Odyssey',
      subtitle: 'Peru, Cusco',
      country: 'Peru',
      location: 'Machu Picchu',
      region: 'Americas' as const,
      rating: 9.4,
      reviewCount: 580,
      price: 1650,
      duration: '6 Days',
      groupSize: '14 Max',
      image: '/image/hero/machu_picchu_hero.jpg',
      featured: true,
      description: 'Sacred Andean peaks and lost ancient citadel',
      highlights: [],
      itinerary: [],
      included: []
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tours.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tours.length) % tours.length);
  };

  const activeTour = tours[currentIndex];
  const nextTour = tours[(currentIndex + 1) % tours.length];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100vh] lg:min-h-[105vh] flex items-center pt-28 pb-24 overflow-hidden"
    >
      {/* Background Image with Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/image/hero/machu_picchu_hero.jpg"
          alt="Majestic Mountain Landscape"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Gradients to match the dark aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031422]/90 via-[#031422]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031422] via-[#031422]/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#031422]/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading, Description & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 pt-4 lg:pt-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Global Expeditions</span>
          </motion.div>

          {/* Main Title exactly matching the reference theme */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-display"
          >
            Journey to All World <br />
            <span className="text-white drop-shadow-md">Courners</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={descRef}
            className="text-base sm:text-lg text-slate-200/90 max-w-xl font-normal leading-relaxed drop-shadow"
          >
            Unlock the wonders of the world: Your dream trip. Our tours offer a diverse range of destinations that cater to a wide variety of interests.
          </p>

          {/* Call to action button matching the yellow glowing outline style */}
          <div ref={ctaRef} className="pt-2">
            <button
              onClick={() => onOpenBooking(activeTour?.id)}
              className="relative group px-8 py-3 rounded-full border border-amber-400/90 text-amber-300 font-semibold text-sm tracking-wide bg-amber-400/10 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:shadow-[0_0_35px_rgba(251,191,36,0.7)] hover:bg-amber-400 hover:text-slate-950 transition-all duration-300 cursor-pointer active:scale-95"
            >
              Book a Trip
            </button>
          </div>
        </div>

        {/* Right Column: Floating Tour Slider Preview */}
        <div className="lg:col-span-5 relative flex justify-end">
          <div className="relative w-full max-w-md">
            {/* Active Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.92, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/60 backdrop-blur-xl group cursor-pointer"
                onClick={() => onSelectTour(activeTour)}
              >
                {/* Card Image */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={activeTour.image}
                    alt={activeTour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/20" />

                  {/* Rating Tag top right */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md">
                    <span>{activeTour.rating.toFixed(1)}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  </div>

                  {/* Location & Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs uppercase tracking-widest text-slate-300 font-medium">
                      {activeTour.country} &bull; {activeTour.location}
                    </p>
                    <h3 className="text-2xl font-bold text-white font-display mt-0.5 tracking-tight group-hover:text-amber-300 transition-colors">
                      {activeTour.title}
                    </h3>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="px-5 py-3.5 bg-slate-950/75 flex items-center justify-between border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">From</span>
                    <span className="text-sm font-bold text-amber-400">${activeTour.price}</span>
                    <span className="text-[11px] text-slate-400">/ person</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      aria-label="Previous tour"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      aria-label="Next tour"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next Peek Card (partial card on the right, matching design) */}
            <div
              onClick={handleNext}
              className="hidden sm:block absolute top-6 -right-16 w-48 h-56 rounded-3xl overflow-hidden border border-white/15 bg-slate-900/40 backdrop-blur-md opacity-40 hover:opacity-75 transition-all duration-300 transform scale-90 translate-y-2 pointer-events-auto cursor-pointer -z-10"
            >
              <img
                src={nextTour.image}
                alt={nextTour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/50" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                <p className="text-[10px] text-slate-300">{nextTour.country}</p>
                <p className="truncate font-display">{nextTour.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
