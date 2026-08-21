import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Users, MapPin, Check, Calendar } from 'lucide-react';
import { Tour } from '@/types';
import { Button } from '@/components/ui/button';

interface TourDetailsModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTour: (tourId: string) => void;
}

export const TourDetailsModal: React.FC<TourDetailsModalProps> = ({
  tour,
  isOpen,
  onClose,
  onBookTour,
}) => {
  if (!isOpen || !tour) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#061e32] border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-10 text-white max-h-[90vh] flex flex-col my-auto"
        >
          {/* Header Image */}
          <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061e32] via-[#061e32]/40 to-black/30" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {tour.country} &bull; {tour.location}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display mt-1 text-white">
                {tour.title}
              </h3>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {/* Quick Meta */}
            <div className="grid grid-cols-3 gap-3 bg-white/5 rounded-2xl p-4 border border-white/10 text-center text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-[11px]">Duration</span>
                <span className="font-bold text-white mt-0.5 block">{tour.duration}</span>
              </div>
              <div className="border-x border-white/10">
                <span className="text-slate-400 block text-[11px]">Group Size</span>
                <span className="font-bold text-white mt-0.5 block">{tour.groupSize}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Guest Rating</span>
                <div className="flex items-center justify-center gap-1 font-bold text-amber-300 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{tour.rating.toFixed(1)} / 10</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 font-display">
                Expedition Overview
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 font-display">
                  Trip Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day by Day Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 font-display">
                  Day-by-Day Itinerary
                </h4>
                <div className="space-y-3">
                  {tour.itinerary.map((item) => (
                    <div
                      key={item.day}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-bold text-xs font-mono">
                          Day {item.day}
                        </span>
                        <h5 className="text-sm font-bold text-white font-display">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-300 pl-2">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {tour.included && tour.included.length > 0 && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 font-display">
                  What’s Included
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {tour.included.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-6 bg-[#041624] border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Total Investment</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-400 font-display">
                  ${tour.price}
                </span>
                <span className="text-xs text-slate-400">/ person (15% discount eligible)</span>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              onClick={() => {
                onClose();
                onBookTour(tour.id);
              }}
              className="text-sm font-bold shadow-lg shadow-amber-400/20"
            >
              Book This Tour
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
