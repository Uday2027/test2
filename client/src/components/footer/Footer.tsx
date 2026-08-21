import React, { useState } from 'react';
import { Plane, Send, Heart, Shield, Award, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await api.subscribeNewsletter(email);
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-[#020b14] text-slate-300 pt-20 pb-12 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Top Newsletter Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/15 bg-gradient-to-r from-[#041d33] via-[#062947] to-[#041d33] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Exclusive Secret Escapes</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display">
                Get 15% Off Your Next Expedition
              </h3>
              <p className="text-slate-300 text-sm max-w-lg">
                Subscribe to receive weekly private itineraries, early-bird flash sales, and secret travel destinations.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-sm">
                  <Check className="w-5 h-5" />
                  <span>You’re subscribed! Check your inbox for your 15% voucher.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-2xl bg-slate-900/80 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <Button type="submit" variant="default" size="default" className="font-bold">
                    <Send className="w-4 h-4 mr-1.5" />
                    <span>Join</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black shadow-md">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-display italic text-2xl font-black text-white tracking-wider">
                FLY FLY
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Crafting extraordinary journeys to all corners of the world. Passionate travel architects delivering authentic cultural discoveries and luxury comfort.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>ATOL Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>IATA Certified</span>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-display">
              Destinations
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#destinations" className="hover:text-amber-300 transition">Asia & Japan</a></li>
              <li><a href="#destinations" className="hover:text-amber-300 transition">Europe & Swiss Alps</a></li>
              <li><a href="#destinations" className="hover:text-amber-300 transition">Africa Safari</a></li>
              <li><a href="#destinations" className="hover:text-amber-300 transition">Australia & Barrier Reef</a></li>
              <li><a href="#destinations" className="hover:text-amber-300 transition">New Zealand Fiords</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-display">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-amber-300 transition">About Our Agency</a></li>
              <li><a href="#tours" className="hover:text-amber-300 transition">Exclusive Tours</a></li>
              <li><a href="#reviews" className="hover:text-amber-300 transition">Client Reviews</a></li>
              <li><a href="#highlights" className="hover:text-amber-300 transition">15% Partner Offer</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-display">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span>24/7 Concierge Hotline</span></li>
              <li className="text-amber-300 font-mono text-xs">+1 (800) 555-FLYFLY</li>
              <li><span>concierge@flyflytravel.com</span></li>
              <li><span>Visa & Entry Guidance</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} FLY FLY Travel Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
