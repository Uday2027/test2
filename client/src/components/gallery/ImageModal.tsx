import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  imageTitle: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageSrc,
  imageTitle,
  onClose,
}) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={imageSrc}
            alt={imageTitle}
            className="w-full h-full max-h-[75vh] object-contain"
          />

          <div className="p-4 bg-slate-900/90 text-white flex items-center justify-between">
            <span className="font-display font-bold text-base">{imageTitle}</span>
            <span className="text-xs text-amber-300">FLY FLY Curated Gallery</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
