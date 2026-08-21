import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Smile, Globe, Crown, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { StatsData } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface StatsSectionProps {
  stats: StatsData;
  onOpenPartnerModal: () => void;
  onSelectGalleryImage?: (img: string, title: string) => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  onOpenPartnerModal,
  onSelectGalleryImage,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const count1Ref = useRef<HTMLSpanElement>(null);
  const count2Ref = useRef<HTMLSpanElement>(null);
  const count3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animations
      const targets = [
        { ref: count1Ref.current, endVal: stats.yearsOfExperience, suffix: '' },
        { ref: count2Ref.current, endVal: stats.satisfiedClients, suffix: '' },
        { ref: count3Ref.current, endVal: stats.countriesCovered, suffix: '' }
      ];

      targets.forEach((item) => {
        if (!item.ref) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.endVal,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            if (item.ref) {
              item.ref.innerText = Math.floor(obj.val).toLocaleString() + item.suffix;
            }
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      id="highlights"
      className="relative bg-[#041624] text-white pt-20 pb-28 overflow-hidden z-20"
    >
      {/* Curved Wave Top Divider Transition from Hero */}
      <div className="absolute -top-1 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 lg:h-28 text-[#041624] preserve-3d"
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,69.3C480,64,600,32,720,26.7C840,21,960,43,1080,48C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Decorative Watermarks (Palm leaves & passport line drawings) */}
      <div className="absolute top-10 -left-16 w-96 h-96 opacity-10 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="currentColor" className="text-cyan-400 w-full h-full">
          <path d="M42.7,105.8c12.5-35.3,47.8-63.5,84.4-71.1c-14.7,24.4-23.7,53.2-24.8,83.1c-1.3,34.4,7.8,68.9,25.9,98.2 C103.5,191.8,70.9,157.9,42.7,105.8z" />
          <path d="M12.3,142.1c25.4-28.1,65.8-45.7,103.9-45.2c-20.9,19.4-36.8,45.1-44.6,73.4C63.2,199.8,42.3,172.9,12.3,142.1z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stats & Promo */}
          <div className="lg:col-span-6 space-y-9">
            {/* 3 Metric Counters */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 border-b border-white/10 pb-8">
              {/* Stat 1 */}
              <div className="flex flex-col items-start space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-amber-300">
                  <Calendar className="w-4 h-4" />
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Years of Experience</p>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  <span ref={count1Ref}>{stats.yearsOfExperience}</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-start space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-amber-300">
                  <Smile className="w-4 h-4" />
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Satisfied Clients</p>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  <span ref={count2Ref}>{stats.satisfiedClients}</span>
                  <span className="text-amber-400 text-xl font-normal">+</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-start space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-amber-300">
                  <Globe className="w-4 h-4" />
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Countries Covered</p>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  <span ref={count3Ref}>{stats.countriesCovered}</span>
                </div>
              </div>
            </div>

            {/* Narrative text matching reference image */}
            <div className="space-y-4 text-slate-300/90 text-sm sm:text-base leading-relaxed">
              <p>
                Our tours offer a diverse range of destinations that cater to a wide variety of interests. From sun-drenched sandy beaches with crystal-clear blue oceans, to breathtaking mountain landscapes, tranquil lakes, and lush forests, we’ve got you covered.
              </p>
              <p className="text-slate-200 font-medium">
                Don’t waste your chance! We have a tempting offer for the first 50 people who apply for the tour will receive a <span className="text-amber-300 font-bold underline decoration-amber-400/60 underline-offset-4">15% discount</span> on purchases from our partners:
              </p>
            </div>

            {/* Badges and "Learn more" link */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                {/* Badge 1: Crown */}
                <div className="w-10 h-10 rounded-full border border-white/25 bg-white/5 flex items-center justify-center text-amber-300 hover:border-amber-400 hover:bg-amber-400/10 transition-colors shadow-md">
                  <Crown className="w-5 h-5" />
                </div>
                {/* Badge 2: Compass */}
                <div className="w-10 h-10 rounded-full border border-white/25 bg-white/5 flex items-center justify-center text-cyan-300 hover:border-cyan-400 hover:bg-cyan-400/10 transition-colors shadow-md">
                  <Compass className="w-5 h-5" />
                </div>
                {/* Badge 3: Shield */}
                <div className="w-10 h-10 rounded-full border border-white/25 bg-white/5 flex items-center justify-center text-emerald-300 hover:border-emerald-400 hover:bg-emerald-400/10 transition-colors shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              {/* Learn More link with glowing yellow text & arrow */}
              <button
                onClick={onOpenPartnerModal}
                className="group inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold text-sm transition-all duration-200 cursor-pointer"
              >
                <span className="underline underline-offset-4 decoration-amber-400/80 group-hover:decoration-amber-300">
                  Learn more
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Floating Tilted Photo Cards */}
          <div className="lg:col-span-6 relative flex justify-center py-6">
            {/* Passport Watermark Stamp Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 select-none">
              <div className="w-80 h-96 border-2 border-dashed border-white rounded-3xl rotate-12 flex flex-col p-6">
                <div className="text-center font-mono tracking-widest text-xs uppercase text-white">PASSPORT VISA &bull; FLY FLY</div>
                <div className="flex-1 flex items-center justify-center">
                  <Globe className="w-32 h-32 stroke-1" />
                </div>
                <div className="text-[10px] font-mono text-center tracking-tighter">OFFICIAL TRAVEL PASS #8892-GLOBAL</div>
              </div>
            </div>

            {/* Stack of 3 Tilted Cards */}
            <div className="relative w-full max-w-lg h-[340px] sm:h-[400px] flex items-center justify-center">
              {/* Card 1: Left tilted (-8deg) Mountain Lake */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: -4, zIndex: 30 }}
                transition={{ duration: 0.3 }}
                className="absolute left-2 sm:left-4 top-6 w-36 sm:w-44 h-56 sm:h-72 rounded-2xl p-1 bg-white shadow-2xl shadow-black/80 transform -rotate-8 cursor-pointer overflow-hidden group"
                onClick={() => onSelectGalleryImage?.('/image/gallery/mountain_lake.jpg', 'Alpine Green Valley')}
              >
                <img
                  src="/image/gallery/mountain_lake.jpg"
                  alt="Mountain Valley Lake"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>

              {/* Card 2: Center elevated (0deg) Overwater Resort */}
              <motion.div
                whileHover={{ scale: 1.06, rotate: 2, zIndex: 30 }}
                transition={{ duration: 0.3 }}
                className="absolute z-10 top-0 w-44 sm:w-52 h-64 sm:h-80 rounded-2xl p-1.5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.9)] transform rotate-0 cursor-pointer overflow-hidden group border-2 border-white"
                onClick={() => onSelectGalleryImage?.('/image/gallery/resort_aerial.jpg', 'Overwater Turquoise Resort')}
              >
                <img
                  src="/image/gallery/resort_aerial.jpg"
                  alt="Tropical Overwater Resort"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>

              {/* Card 3: Right tilted (+8deg) Machu Picchu */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 4, zIndex: 30 }}
                transition={{ duration: 0.3 }}
                className="absolute right-2 sm:right-4 top-6 w-36 sm:w-44 h-56 sm:h-72 rounded-2xl p-1 bg-white shadow-2xl shadow-black/80 transform rotate-8 cursor-pointer overflow-hidden group"
                onClick={() => onSelectGalleryImage?.('/image/gallery/machu_picchu_card.jpg', 'Inca Citadel Trail')}
              >
                <img
                  src="/image/gallery/machu_picchu_card.jpg"
                  alt="Machu Picchu Vertical Trail"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
