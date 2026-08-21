import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Clock, DollarSign, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle airplane path animation
      if (planeRef.current) {
        gsap.fromTo(
          planeRef.current,
          { x: -50, opacity: 0 },
          {
            x: 250,
            opacity: 0.6,
            duration: 12,
            repeat: -1,
            ease: 'linear',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#031422] text-white py-24 sm:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Background Dotted Flight Path Graphic with Airplane */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 350 C 300 200, 600 380, 900 180 C 1050 80, 1150 150, 1200 120"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>

        {/* Animated Flying Airplane */}
        <div
          ref={planeRef}
          className="absolute bottom-16 left-12 text-amber-300 transform -rotate-12 select-none"
        >
          <Plane className="w-8 h-8 fill-amber-300/40" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Office Lounge Photo Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900/50 p-2 group">
              <div className="rounded-2xl overflow-hidden h-[340px] sm:h-[420px]">
                <img
                  src="/image/about/travel_office.jpg"
                  alt="FLY FLY Travel Agency Modern Lounge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none rounded-2xl" />
            </div>
          </motion.div>

          {/* Right Column: Narrative & Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Section Title */}
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              About Us
            </h2>

            {/* Narrative text matching reference image */}
            <div className="space-y-4 text-slate-300/90 text-sm sm:text-base leading-relaxed">
              <p>
                Our team of travel experts is passionate about exploring the world and helping our clients to do the same. With years of experience in the travel industry, we have developed strong relationships with suppliers and vendors around the world, allowing us to offer exclusive deals and insider access to some of the world’s most incredible destinations.
              </p>
              <p>
                At our travel agency, we believe that travel is more than just visiting new places — it’s about experiencing new cultures, meeting new people, and creating memories that last a lifetime.
              </p>
            </div>

            {/* 3 Core Value Badges at bottom */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              {/* Value 1: Reliability */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2 group">
                <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-amber-300 group-hover:bg-amber-400/20 group-hover:border-amber-400 transition-colors shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  Reliability
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:block">
                  100% verified & secure
                </span>
              </div>

              {/* Value 2: All Fast */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2 group">
                <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-amber-300 group-hover:bg-amber-400/20 group-hover:border-amber-400 transition-colors shadow-md">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  All Fast
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:block">
                  Instant booking & visa assistance
                </span>
              </div>

              {/* Value 3: Profitability / Best Value */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2 group">
                <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-amber-300 group-hover:bg-amber-400/20 group-hover:border-amber-400 transition-colors shadow-md">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  Profitability
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:block">
                  Guaranteed best market rates
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
