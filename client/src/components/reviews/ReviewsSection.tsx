import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Quote, Plus, X } from 'lucide-react';
import { Review } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: { name: string; rating: number; comment: string; tourName: string; location: string }) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [tourName, setTourName] = useState('Incan Odyssey');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    onAddReview({
      name,
      location: location || 'World Explorer',
      tourName,
      rating,
      comment
    });

    setName('');
    setLocation('');
    setComment('');
    setIsModalOpen(false);
  };

  return (
    <section
      id="reviews"
      className="relative bg-[#020e1a] text-white py-28 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Traveler Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Loved by Over 5,000+ Explorers
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-lg">
              Read firsthand impressions from globetrotters who experienced our personalized journeys across the world.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-xs font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </Button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-7 border border-white/15 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-amber-400/10 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'fill-amber-400 stroke-amber-400'
                          : 'fill-slate-700 stroke-slate-700'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-slate-400 ml-2">{rev.date}</span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author & Tour */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-white/10 mt-6">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-amber-400/50 flex-shrink-0 bg-slate-800">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white font-display truncate">
                      {rev.name}
                    </h4>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{rev.location}</p>
                  <p className="text-[10px] text-amber-300 font-medium truncate mt-0.5">
                    Tour: {rev.tourName}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#061d30] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white space-y-5"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold font-display">Share Your Experience</h3>
                <p className="text-xs text-slate-300">Let other travelers know about your journey.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Your Name *</label>
                  <Input
                    required
                    placeholder="e.g. Clara Oswald"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Location / City</label>
                    <Input
                      placeholder="e.g. New York, USA"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Tour Experience</label>
                    <Input
                      placeholder="e.g. Hawaii Sunset Tour"
                      value={tourName}
                      onChange={(e) => setTourName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Rating</label>
                  <div className="flex gap-2 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-400 stroke-amber-400'
                              : 'fill-slate-700 stroke-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Your Review *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you loved most about the expedition..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded-2xl bg-white/5 border border-white/15 p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <Button type="submit" variant="default" size="lg" className="w-full font-bold">
                  Publish Review
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
