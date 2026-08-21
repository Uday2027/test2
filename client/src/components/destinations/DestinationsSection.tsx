import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, CheckCircle2, ArrowUpRight, Compass } from 'lucide-react';
import { DestinationRegion } from '@/types';
import { FALLBACK_REGIONS } from '@/services/api';
import { Button } from '@/components/ui/button';

interface DestinationsSectionProps {
  onOpenBooking: (tourId?: string) => void;
}

const REGION_KEYS = ['Australia', 'Africa', 'Europe', 'Asia', 'New Zeland'] as const;

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ onOpenBooking }) => {
  const [activeRegionKey, setActiveRegionKey] = useState<string>('Asia');
  const regionData: DestinationRegion = FALLBACK_REGIONS[activeRegionKey] || FALLBACK_REGIONS['Asia'];

  return (
    <section
      id="destinations"
      className="relative bg-[#020e1a] text-white py-28 overflow-hidden border-t border-white/5"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display">
            Destinations
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Choose your next continent of discovery and explore world-class expeditions curated by local experts.
          </p>
        </div>

        {/* Continent Selector Tabs exactly matching design */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 border-b border-white/10 pb-8 mb-16">
          {REGION_KEYS.map((region) => {
            const isActive = activeRegionKey === region;
            return (
              <button
                key={region}
                onClick={() => setActiveRegionKey(region)}
                className={`relative text-xl sm:text-2xl md:text-3xl font-bold tracking-tight transition-all duration-300 cursor-pointer font-display ${
                  isActive
                    ? 'text-amber-400 scale-110 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {region}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-400 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content for Selected Continent */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegionKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-16"
          >
            {/* Subheading: "Five reasons to visit [Region]" */}
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display tracking-tight">
                Five reasons to visit <span className="text-amber-300">{regionData.name}</span>
              </h3>
              <p className="text-slate-400 text-sm mt-2">{regionData.tagline}</p>
            </div>

            {/* 5 Reasons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionData.reasonsToVisit.map((reason) => (
                <div
                  key={reason.number}
                  className="glass-card rounded-3xl p-6 hover:border-amber-400/50 hover:bg-slate-900/80 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 font-extrabold font-display text-sm group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors duration-300">
                      0{reason.number}
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-display">
                      {reason.title}
                    </h4>
                    <p className="text-slate-300/85 text-xs sm:text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Special CTA 6th Card */}
              <div className="glass-card rounded-3xl p-6 border-amber-400/40 bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-slate-900/80 flex flex-col justify-between items-start">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-2xl bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-display">
                    Custom {regionData.name} Itinerary?
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Our private travel concierges can tailor-make a bespoke journey exclusively for you and your family.
                  </p>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onOpenBooking()}
                  className="mt-4 text-xs font-bold"
                >
                  Request Custom Quote
                </Button>
              </div>
            </div>

            {/* Popular Spots in this Continent */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Top Featured Spots in {regionData.name}
                  </h4>
                  <p className="text-xs text-slate-400">Hand-picked by our expedition leaders</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionData.popularSpots.map((spot, idx) => (
                  <motion.div
                    key={spot.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group rounded-3xl overflow-hidden glass-card border border-white/15 hover:border-amber-400/50 transition-all duration-300 flex flex-col cursor-pointer"
                    onClick={() => onOpenBooking()}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1">
                        <span>{spot.rating}</span>
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {spot.country}
                        </span>
                        <h5 className="text-base font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                          {spot.name}
                        </h5>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between bg-slate-950/40 mt-auto">
                      <div>
                        <span className="text-[11px] text-slate-400 block">From</span>
                        <span className="text-sm font-bold text-amber-400">${spot.price}</span>
                        <span className="text-[10px] text-slate-400"> / {spot.duration}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking();
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
