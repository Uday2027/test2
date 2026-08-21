import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, CheckCircle, Calendar, Users, Shield, Tag, Sparkles, Plane } from 'lucide-react';
import { Tour, BookingResponse } from '@/types';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTourId?: string;
  tours: Tour[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedTourId,
  tours,
}) => {
  const [tourId, setTourId] = useState<string>(selectedTourId || (tours[0]?.id ?? 'hawaii-beach-escape'));
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('2026-09-15');
  const [passengers, setPassengers] = useState(2);
  const [promoCode, setPromoCode] = useState('FLYWORLD15');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingResponse | null>(null);

  useEffect(() => {
    if (selectedTourId) {
      setTourId(selectedTourId);
    }
  }, [selectedTourId]);

  if (!isOpen) return null;

  const currentTour = tours.find((t) => t.id === tourId) || tours[0];
  const basePrice = currentTour ? currentTour.price : 1450;
  const subtotal = basePrice * passengers;
  const isPromoValid = promoCode.trim().toUpperCase() === 'FLYWORLD15' || promoCode.trim().toUpperCase() === 'EARLY50';
  const discountRate = isPromoValid ? 0.15 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const total = subtotal - discountAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setLoading(true);
    try {
      const res = await api.createBooking({
        tourId,
        fullName,
        email,
        phone,
        travelDate,
        passengers,
        promoCode: isPromoValid ? promoCode : undefined,
        notes
      });

      setConfirmation(res);

      // Trigger celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#061d30] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white my-auto"
        >
          {/* Close button */}
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>

          {confirmation ? (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300 mx-auto animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                  Reservation Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
                  You’re Traveling with FLY FLY!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  A confirmation email and customized expedition dossier have been sent to{' '}
                  <span className="text-amber-300 font-semibold">{confirmation.email}</span>.
                </p>
              </div>

              {/* Receipt card */}
              <div className="bg-slate-900/80 rounded-2xl p-5 border border-white/10 text-left space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Booking Reference:</span>
                  <span className="font-mono font-bold text-amber-300">{confirmation.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expedition Tour:</span>
                  <span className="font-semibold text-white truncate max-w-[220px]">{confirmation.tourTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Traveler:</span>
                  <span className="text-white">{confirmation.fullName} ({confirmation.passengers} Guests)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Departure Date:</span>
                  <span className="text-white">{confirmation.travelDate}</span>
                </div>
                {confirmation.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Partner Early-Bird (15% OFF):</span>
                    <span>-${confirmation.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-white/10 pt-2 text-base font-bold">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-amber-400 font-display">${confirmation.total}</span>
                </div>
              </div>

              <Button variant="default" size="lg" onClick={handleReset} className="w-full">
                Done & Return to Explorer
              </Button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>15% Early Bird Offer Active</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Book Your Dream Tour
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Fill in your details below to lock in the early-bird partner rate.
                </p>
              </div>

              {/* Select Tour */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Select Tour Package
                </label>
                <select
                  value={tourId}
                  onChange={(e) => setTourId(e.target.value)}
                  className="w-full h-11 px-4 rounded-2xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {tours.map((t) => (
                    <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                      {t.title} ({t.country} - ${t.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <Input
                    required
                    placeholder="e.g. Alexander Wright"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Departure Date
                  </label>
                  <Input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="w-11 h-11 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-lg font-bold hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className="font-bold text-base w-8 text-center">{passengers}</span>
                    <button
                      type="button"
                      onClick={() => setPassengers(passengers + 1)}
                      className="w-11 h-11 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-lg font-bold hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Promo Code</span>
                  {isPromoValid && <span className="text-emerald-400 text-[11px]">✓ 15% discount applied</span>}
                </label>
                <div className="flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="FLYWORLD15"
                    className="uppercase font-mono tracking-wider"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal ({passengers} &times; ${basePrice}):</span>
                  <span>${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Partner Discount (15%):</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Amount:</span>
                  <span className="text-amber-400 font-display text-lg">${total}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={loading}
                className="w-full text-base font-bold shadow-lg shadow-amber-400/25"
              >
                {loading ? 'Confirming Reservation...' : `Confirm Booking • $${total}`}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
