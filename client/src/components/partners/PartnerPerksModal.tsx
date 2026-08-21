import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Compass, ShieldCheck, Copy, Check, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PartnerPerksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPromoAndBook: () => void;
}

export const PartnerPerksModal: React.FC<PartnerPerksModalProps> = ({
  isOpen,
  onClose,
  onApplyPromoAndBook,
}) => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'FLYWORLD15';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const partnerPerks = [
    {
      icon: Crown,
      title: 'Crown VIP Hospitality',
      description: 'Exclusive room upgrades at partner 5-star boutique resorts and priority lounge access across 45 international hubs.'
    },
    {
      icon: Compass,
      title: 'Global Expeditions Club',
      description: '15% instant savings on specialized trekking gear, private helicopter scenic transfers, and customized catamaran charters.'
    },
    {
      icon: ShieldCheck,
      title: '100% Comprehensive Travel Guard',
      description: 'Complimentary premium travel insurance covering delays, lost baggage, and 24/7 multilingual medical concierge support.'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#061d30] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white my-auto space-y-6"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exclusive Partner Privileges</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              15% Partner Early-Bird Discount
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Available for the first 50 explorers who book any international tour package with FLY FLY.
            </p>
          </div>

          {/* Promo code voucher */}
          <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Your Discount Voucher</span>
                <span className="font-mono font-black text-xl text-amber-300 tracking-wider">{promoCode}</span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Perks List */}
          <div className="space-y-3">
            {partnerPerks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">{perk.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-0.5">{perk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            variant="default"
            size="lg"
            onClick={() => {
              onClose();
              onApplyPromoAndBook();
            }}
            className="w-full font-bold flex items-center justify-center gap-2"
          >
            <span>Apply 15% Discount & Book Tour</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
