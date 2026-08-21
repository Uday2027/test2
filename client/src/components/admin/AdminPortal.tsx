import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, LayoutDashboard, Compass, CalendarCheck, MessageSquare,
  Users, UploadCloud, Plus, Trash2, Edit, Check, AlertCircle,
  RefreshCw, DollarSign, Eye, Search, Filter, Shield
} from 'lucide-react';
import { Tour } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  tours: Tour[];
  onRefreshTours: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  tours,
  onRefreshTours,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tours' | 'bookings' | 'reviews' | 'subscribers' | 'media'>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [overviewData, setOverviewData] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Tour Form State
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<any | null>(null);
  const [tourForm, setTourForm] = useState({
    title: '',
    subtitle: '',
    country: '',
    location: '',
    region: 'Asia',
    price: 1200,
    originalPrice: 1500,
    duration: '7 Days / 6 Nights',
    groupSize: 'Max 12 People',
    image: '/image/destinations/asia_bali.jpg',
    tag: 'Trending',
    featured: true,
    heroSlide: false,
    description: '',
    highlights: '5-Star Luxury Stays, Private Chauffeur, VIP Passes',
    included: 'Accommodations, Daily Breakfasts, Entrance Tickets'
  });

  // Media Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchOverview();
      fetchBookings();
      fetchSubscribers();
    }
  }, [isOpen]);

  const fetchOverview = async () => {
    try {
      const res = await fetch('/api/admin/overview');
      if (res.ok) {
        const json = await res.json();
        setOverviewData(json.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/bookings');
      if (res.ok) {
        const json = await res.json();
        setBookings(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/admin/subscribers');
      if (res.ok) {
        const json = await res.json();
        setSubscribers(json.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchBookings();
        fetchOverview();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      await fetch(`/api/admin/bookings/${bookingId}`, { method: 'DELETE' });
      fetchBookings();
      fetchOverview();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...tourForm,
        highlights: typeof tourForm.highlights === 'string'
          ? tourForm.highlights.split(',').map(s => s.trim()).filter(Boolean)
          : tourForm.highlights,
        included: typeof tourForm.included === 'string'
          ? tourForm.included.split(',').map(s => s.trim()).filter(Boolean)
          : tourForm.included
      };

      const url = editingTour ? `/api/admin/tours/${editingTour.id}` : '/api/admin/tours';
      const method = editingTour ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsTourModalOpen(false);
        setEditingTour(null);
        onRefreshTours();
        fetchOverview();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTour = async (tourId: string) => {
    if (!confirm('Delete this tour package from database?')) return;
    try {
      await fetch(`/api/admin/tours/${tourId}`, { method: 'DELETE' });
      onRefreshTours();
      fetchOverview();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const json = await res.json();
        setUploadedUrl(json.url);
        setTourForm(prev => ({ ...prev, image: json.url }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Admin Dashboard Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-6xl h-[92vh] bg-[#041624] border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-10 text-white flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-white/10 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display flex items-center gap-2">
                  FLY FLY Admin Portal
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    MongoDB Atlas + Cloudinary Live
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  fetchOverview();
                  fetchBookings();
                  fetchSubscribers();
                  onRefreshTours();
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
                title="Refresh Data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-header Tabs */}
          <div className="px-6 py-2 border-b border-white/10 bg-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { key: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { key: 'bookings', label: `Bookings (${bookings.length})`, icon: CalendarCheck },
              { key: 'tours', label: `Tours (${tours.length})`, icon: Compass },
              { key: 'subscribers', label: `Subscribers (${subscribers.length})`, icon: Users },
              { key: 'media', label: 'Cloudinary Media', icon: UploadCloud }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Scrollable Content Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-1">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Total Revenue</span>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
                      ${overviewData?.totalRevenue?.toLocaleString() || '0'}
                    </h4>
                    <p className="text-[11px] text-emerald-400 font-medium">From verified reservations</p>
                  </div>

                  <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-1">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Active Bookings</span>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {overviewData?.bookingCount || bookings.length}
                    </h4>
                    <p className="text-[11px] text-slate-400">Stored in MongoDB Atlas</p>
                  </div>

                  <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-1">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Tour Packages</span>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {tours.length}
                    </h4>
                    <p className="text-[11px] text-amber-300 font-medium">Across 5 Continents</p>
                  </div>

                  <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-1">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Subscribers</span>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {subscribers.length}
                    </h4>
                    <p className="text-[11px] text-cyan-400">Newsletter leads</p>
                  </div>
                </div>

                {/* Recent Bookings Snapshot */}
                <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold font-display text-white">Recent Customer Bookings</h4>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('bookings')} className="text-xs">
                      View All Bookings
                    </Button>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 text-sm">
                      No customer bookings yet. Make a reservation on the site to see it update here in real time!
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-white/10 text-slate-400">
                            <th className="pb-3 font-semibold">REF #</th>
                            <th className="pb-3 font-semibold">Traveler</th>
                            <th className="pb-3 font-semibold">Tour</th>
                            <th className="pb-3 font-semibold">Departure</th>
                            <th className="pb-3 font-semibold">Total</th>
                            <th className="pb-3 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {bookings.slice(0, 5).map((b) => (
                            <tr key={b.bookingId || b._id} className="hover:bg-white/5 transition">
                              <td className="py-3 font-mono text-amber-300">{b.bookingId}</td>
                              <td className="py-3 font-semibold text-white">{b.fullName}</td>
                              <td className="py-3 text-slate-300">{b.tourTitle}</td>
                              <td className="py-3 text-slate-400">{b.travelDate}</td>
                              <td className="py-3 font-bold text-amber-400">${b.total}</td>
                              <td className="py-3">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  b.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                                }`}>
                                  {b.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold font-display text-white">All Tour Reservations</h4>
                    <p className="text-xs text-slate-400">Live data synchronized with MongoDB Atlas Cluster0</p>
                  </div>
                </div>

                <div className="glass-card rounded-3xl p-6 border border-white/10 overflow-x-auto">
                  {bookings.length === 0 ? (
                    <p className="text-center py-12 text-slate-400">No bookings found in database.</p>
                  ) : (
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400">
                          <th className="pb-3 font-semibold">Reference</th>
                          <th className="pb-3 font-semibold">Customer Details</th>
                          <th className="pb-3 font-semibold">Tour & Date</th>
                          <th className="pb-3 font-semibold">Guests & Discount</th>
                          <th className="pb-3 font-semibold">Amount</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {bookings.map((b) => (
                          <tr key={b.bookingId || b._id} className="hover:bg-white/5 transition">
                            <td className="py-3.5 font-mono text-amber-300 font-bold">{b.bookingId}</td>
                            <td className="py-3.5">
                              <p className="font-bold text-white">{b.fullName}</p>
                              <p className="text-[11px] text-slate-400">{b.email}</p>
                              <p className="text-[10px] text-slate-500">{b.phone}</p>
                            </td>
                            <td className="py-3.5">
                              <p className="font-semibold text-slate-200">{b.tourTitle}</p>
                              <p className="text-[11px] text-slate-400">Date: {b.travelDate}</p>
                            </td>
                            <td className="py-3.5">
                              <p className="text-slate-300">{b.passengers} Guests</p>
                              {b.promoCodeApplied && (
                                <span className="text-[10px] text-emerald-400 block font-mono">
                                  {b.promoCodeApplied} (-${b.discountAmount})
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 font-extrabold text-amber-400 text-sm font-display">
                              ${b.total}
                            </td>
                            <td className="py-3.5">
                              <select
                                value={b.status}
                                onChange={(e) => handleUpdateBookingStatus(b.bookingId, e.target.value)}
                                className="bg-slate-900 border border-white/15 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                              >
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="PENDING">PENDING</option>
                                <option value="CANCELLED">CANCELLED</option>
                              </select>
                            </td>
                            <td className="py-3.5 text-right">
                              <button
                                onClick={() => handleDeleteBooking(b.bookingId)}
                                className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 transition"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* 3. TOURS TAB */}
            {activeTab === 'tours' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold font-display text-white">Tours Inventory</h4>
                    <p className="text-xs text-slate-400">Create, edit, or remove tour expeditions</p>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      setEditingTour(null);
                      setTourForm({
                        title: '',
                        subtitle: '',
                        country: '',
                        location: '',
                        region: 'Asia',
                        price: 1200,
                        originalPrice: 1500,
                        duration: '7 Days / 6 Nights',
                        groupSize: 'Max 12 People',
                        image: '/image/destinations/asia_bali.jpg',
                        tag: 'New',
                        featured: true,
                        heroSlide: false,
                        description: '',
                        highlights: '5-Star Luxury Stays, Private Chauffeur, VIP Passes',
                        included: 'Accommodations, Daily Breakfasts, Entrance Tickets'
                      });
                      setIsTourModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Tour</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.map((t) => (
                    <div key={t.id} className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
                      <div className="relative h-44">
                        <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-amber-300 text-[11px] font-bold">
                          ${t.price}
                        </div>
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/70 text-slate-300 text-[10px]">
                          {t.country} &bull; {t.region}
                        </div>
                      </div>

                      <div className="p-4 space-y-2 flex-1">
                        <h5 className="font-bold text-white text-sm font-display truncate">{t.title}</h5>
                        <p className="text-xs text-slate-400 line-clamp-2">{t.description}</p>
                      </div>

                      <div className="p-4 border-t border-white/10 flex items-center justify-between bg-slate-950/40">
                        <span className="text-[11px] text-slate-400">{t.duration}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingTour(t);
                              setTourForm({
                                title: t.title,
                                subtitle: t.subtitle || '',
                                country: t.country,
                                location: t.location,
                                region: t.region,
                                price: t.price,
                                originalPrice: t.originalPrice || t.price,
                                duration: t.duration,
                                groupSize: t.groupSize,
                                image: t.image,
                                tag: t.tag || '',
                                featured: t.featured,
                                heroSlide: t.heroSlide || false,
                                description: t.description,
                                highlights: t.highlights?.join(', ') || '',
                                included: t.included?.join(', ') || ''
                              });
                              setIsTourModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTour(t.id)}
                            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SUBSCRIBERS TAB */}
            {activeTab === 'subscribers' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Newsletter Leads</h4>
                  <p className="text-xs text-slate-400">Captured through the 15% discount newsletter form</p>
                </div>

                <div className="glass-card rounded-3xl p-6 border border-white/10">
                  {subscribers.length === 0 ? (
                    <p className="text-center py-10 text-slate-400">No newsletter subscribers yet.</p>
                  ) : (
                    <div className="divide-y divide-white/5 text-xs">
                      {subscribers.map((sub, i) => (
                        <div key={i} className="py-3 flex items-center justify-between">
                          <span className="font-mono text-white text-sm">{sub.email}</span>
                          <span className="text-slate-400 text-xs">
                            {new Date(sub.subscribedAt || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 5. CLOUDINARY MEDIA TAB */}
            {activeTab === 'media' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Upload to Cloudinary (as65dxyn)</h4>
                  <p className="text-xs text-slate-400">Directly upload tour imagery into your 25GB Cloudinary storage</p>
                </div>

                <div className="p-8 border-2 border-dashed border-white/20 rounded-3xl text-center space-y-4 bg-white/5">
                  <UploadCloud className="w-12 h-12 text-amber-400 mx-auto" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Select an image to upload to Cloudinary</p>
                    <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP up to 10MB</p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="block mx-auto text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-slate-950 hover:file:bg-amber-300 cursor-pointer"
                  />

                  {uploading && <p className="text-xs text-amber-300 animate-pulse">Uploading to Cloudinary...</p>}
                </div>

                {uploadedUrl && (
                  <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 space-y-2">
                    <span className="text-xs font-bold text-emerald-300 block">Uploaded Successfully:</span>
                    <input
                      readOnly
                      value={uploadedUrl}
                      className="w-full text-xs font-mono p-2 rounded bg-slate-950 border border-white/10 text-white select-all"
                    />
                    <img src={uploadedUrl} alt="Uploaded preview" className="h-40 rounded-xl object-cover mt-2 border border-white/20" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tour Create/Edit Sub-Modal */}
          <AnimatePresence>
            {isTourModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsTourModalOpen(false)}
                  className="fixed inset-0 bg-black/85 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#071f33] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white space-y-4"
                >
                  <button
                    onClick={() => setIsTourModalOpen(false)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h3 className="text-2xl font-bold font-display">
                    {editingTour ? 'Edit Tour Package' : 'Create New Tour Package'}
                  </h3>

                  <form onSubmit={handleSaveTour} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">Tour Title *</label>
                      <Input
                        required
                        value={tourForm.title}
                        onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })}
                        placeholder="e.g. Majestic Swiss Alps Grand Tour"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Country *</label>
                        <Input
                          required
                          value={tourForm.country}
                          onChange={(e) => setTourForm({ ...tourForm, country: e.target.value })}
                          placeholder="e.g. Switzerland"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Location *</label>
                        <Input
                          required
                          value={tourForm.location}
                          onChange={(e) => setTourForm({ ...tourForm, location: e.target.value })}
                          placeholder="e.g. Zermatt & Interlaken"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Region</label>
                        <select
                          value={tourForm.region}
                          onChange={(e) => setTourForm({ ...tourForm, region: e.target.value })}
                          className="w-full h-11 px-3 rounded-2xl bg-white/5 border border-white/15 text-white"
                        >
                          <option value="Asia" className="bg-slate-900">Asia</option>
                          <option value="Europe" className="bg-slate-900">Europe</option>
                          <option value="Africa" className="bg-slate-900">Africa</option>
                          <option value="Australia" className="bg-slate-900">Australia</option>
                          <option value="New Zeland" className="bg-slate-900">New Zeland</option>
                          <option value="Americas" className="bg-slate-900">Americas</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Price ($) *</label>
                        <Input
                          type="number"
                          required
                          value={tourForm.price}
                          onChange={(e) => setTourForm({ ...tourForm, price: Number(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Duration *</label>
                        <Input
                          value={tourForm.duration}
                          onChange={(e) => setTourForm({ ...tourForm, duration: e.target.value })}
                          placeholder="8 Days / 7 Nights"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">Image URL or Cloudinary Link</label>
                      <Input
                        value={tourForm.image}
                        onChange={(e) => setTourForm({ ...tourForm, image: e.target.value })}
                        placeholder="https://res.cloudinary.com/... or /image/..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">Description *</label>
                      <textarea
                        required
                        rows={3}
                        value={tourForm.description}
                        onChange={(e) => setTourForm({ ...tourForm, description: e.target.value })}
                        className="w-full rounded-2xl bg-white/5 border border-white/15 p-3 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                        placeholder="Detailed itinerary and tour overview..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">Highlights (Comma-separated)</label>
                      <Input
                        value={tourForm.highlights}
                        onChange={(e) => setTourForm({ ...tourForm, highlights: e.target.value })}
                        placeholder="Glacier train ride, 5-Star Hotel, Private Tour"
                      />
                    </div>

                    <Button type="submit" variant="default" size="lg" className="w-full font-bold">
                      {editingTour ? 'Save Tour Changes' : 'Publish Tour Package'}
                    </Button>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
