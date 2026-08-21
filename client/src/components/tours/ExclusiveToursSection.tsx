import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Users, MapPin, ArrowRight, Check, Search, Filter } from 'lucide-react';
import { Tour } from '@/types';
import { Button } from '@/components/ui/button';

interface ExclusiveToursSectionProps {
  tours: Tour[];
  onOpenBooking: (tourId?: string) => void;
  onSelectTour: (tour: Tour) => void;
}

export const ExclusiveToursSection: React.FC<ExclusiveToursSectionProps> = ({
  tours,
  onOpenBooking,
  onSelectTour,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTours = tours.filter((tour) => {
    const matchesFilter = selectedFilter === 'All' || tour.region === selectedFilter;
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterTabs = ['All', 'Asia', 'Europe', 'Africa', 'Australia', 'New Zeland', 'Americas'];

  return (
    <section
      id="tours"
      className="relative bg-[#031422] text-white py-28 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Signature Experiences</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Exclusive Tours
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-lg">
              Carefully curated small-group expeditions with VIP access, 5-star heritage stays, and expert local historians.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search destination or tour..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedFilter === tab
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredTours.map((tour) => (
              <motion.div
                key={tour.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-3xl overflow-hidden glass-card border border-white/15 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => onSelectTour(tour)}>
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Tag top-left */}
                  {tour.tag && (
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold shadow-lg">
                      {tour.tag}
                    </div>
                  )}

                  {/* Rating top-right */}
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <span>{tour.rating.toFixed(1)}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <span className="text-slate-400 text-[10px]">({tour.reviewCount})</span>
                  </div>

                  {/* Country/Location bottom */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <span className="text-xs font-bold text-amber-300 tracking-wider uppercase flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {tour.country} &bull; {tour.location}
                    </span>
                    <h3 className="text-xl font-bold text-white font-display mt-0.5 group-hover:text-amber-300 transition-colors">
                      {tour.title}
                    </h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {tour.description}
                  </p>

                  {/* Meta pills */}
                  <div className="flex items-center gap-4 py-2 border-y border-white/10 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      {tour.originalPrice && (
                        <span className="text-xs text-slate-400 line-through mr-1.5">
                          ${tour.originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-extrabold text-amber-400 font-display">
                        ${tour.price}
                      </span>
                      <span className="text-[11px] text-slate-400 block">per traveler</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSelectTour(tour)}
                        className="text-xs text-slate-300 hover:text-white"
                      >
                        Details
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onOpenBooking(tour.id)}
                        className="text-xs font-bold shadow-md"
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
