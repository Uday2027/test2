import { Router, Request, Response } from 'express';
import multer from 'multer';
import { TOURS_DATA, REGIONS_DATA, STATS, REVIEWS_DATA, Tour, Review } from './data.js';
import { TourModel } from './models/Tour.js';
import { BookingModel } from './models/Booking.js';
import { ReviewModel } from './models/Review.js';
import { SubscriberModel } from './models/Subscriber.js';
import { cloudinary } from './config/cloudinary.js';
import mongoose from 'mongoose';

export const apiRouter = Router();

// Multer memory storage for Cloudinary upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Stats
apiRouter.get('/stats', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: STATS
  });
});

// Regions and Destinations
apiRouter.get('/destinations', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: Object.values(REGIONS_DATA)
  });
});

apiRouter.get('/destinations/:region', (req: Request, res: Response) => {
  const rawParam = req.params.region;
  const regionParam = (Array.isArray(rawParam) ? rawParam[0] : rawParam) || '';
  const regionKey = Object.keys(REGIONS_DATA).find(
    k => k.toLowerCase() === regionParam.toLowerCase() || REGIONS_DATA[k].slug.toLowerCase() === regionParam.toLowerCase()
  );

  if (!regionKey || !REGIONS_DATA[regionKey]) {
    res.status(404).json({ success: false, message: 'Region destination not found' });
    return;
  }

  res.json({
    success: true,
    data: REGIONS_DATA[regionKey]
  });
});

// Tours
apiRouter.get('/tours', async (req: Request, res: Response) => {
  const { region, featured, hero, search } = req.query;

  try {
    if (mongoose.connection.readyState === 1) {
      const query: any = {};
      if (region) query.region = { $regex: new RegExp(`^${region}$`, 'i') };
      if (featured === 'true') query.featured = true;
      if (hero === 'true') query.heroSlide = true;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { country: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      const tours = await TourModel.find(query).sort({ rating: -1 });
      if (tours.length > 0) {
        res.json({ success: true, count: tours.length, data: tours });
        return;
      }
    }
  } catch (err) {
    console.warn('MongoDB query fallback to local static data');
  }

  // Fallback to in-memory data
  let tours = [...TOURS_DATA];
  if (region) {
    tours = tours.filter(t => t.region.toLowerCase() === String(region).toLowerCase());
  }
  if (featured === 'true') {
    tours = tours.filter(t => t.featured);
  }
  if (hero === 'true') {
    tours = tours.filter(t => t.heroSlide);
  }
  if (search) {
    const q = String(search).toLowerCase();
    tours = tours.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.country.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: tours.length,
    data: tours
  });
});

apiRouter.get('/tours/:id', async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const tour = await TourModel.findOne({ id: req.params.id });
      if (tour) {
        res.json({ success: true, data: tour });
        return;
      }
    }
  } catch {}

  const tour = TOURS_DATA.find(t => t.id === req.params.id);
  if (!tour) {
    res.status(404).json({ success: false, message: 'Tour not found' });
    return;
  }
  res.json({ success: true, data: tour });
});

// Bookings endpoint
apiRouter.post('/bookings', async (req: Request, res: Response) => {
  const {
    tourId,
    fullName,
    email,
    phone,
    travelDate,
    passengers = 1,
    promoCode,
    notes
  } = req.body;

  if (!tourId || !fullName || !email) {
    res.status(400).json({
      success: false,
      message: 'Please provide tourId, fullName, and email.'
    });
    return;
  }

  const tour = TOURS_DATA.find(t => t.id === tourId);
  const basePrice = tour ? tour.price : 1450;
  const numGuests = Math.max(1, Number(passengers) || 1);
  let discount = 0;

  // Check 15% discount promo
  if (promoCode && (promoCode.toUpperCase() === 'FLYWORLD15' || promoCode.toUpperCase() === 'EARLY50')) {
    discount = 0.15;
  } else {
    discount = 0.15; // default early bird
  }

  const subtotal = basePrice * numGuests;
  const discountAmount = Math.round(subtotal * discount);
  const total = subtotal - discountAmount;
  const bookingId = `FLY-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;

  const newBooking = {
    bookingId,
    tourId,
    tourTitle: tour ? tour.title : 'Custom World Tour',
    fullName,
    email,
    phone: phone || 'N/A',
    travelDate: travelDate || new Date().toISOString().split('T')[0],
    passengers: numGuests,
    promoCodeApplied: discount > 0 ? (promoCode || 'FLYWORLD15') : null,
    discountAmount,
    total,
    notes: notes || '',
    status: 'CONFIRMED' as const,
    createdAt: new Date()
  };

  try {
    if (mongoose.connection.readyState === 1) {
      await BookingModel.create(newBooking);
    }
  } catch (err: any) {
    console.error('Error saving booking to MongoDB:', err.message);
  }

  res.status(201).json({
    success: true,
    message: 'Congratulations! Your tour booking reservation has been successfully confirmed.',
    data: newBooking
  });
});

// Reviews
apiRouter.get('/reviews', async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbReviews = await ReviewModel.find().sort({ createdAt: -1 });
      if (dbReviews.length > 0) {
        res.json({ success: true, count: dbReviews.length, data: dbReviews });
        return;
      }
    }
  } catch {}

  res.json({
    success: true,
    count: REVIEWS_DATA.length,
    data: REVIEWS_DATA
  });
});

apiRouter.post('/reviews', async (req: Request, res: Response) => {
  const { name, rating, comment, tourName, location } = req.body;
  if (!name || !comment) {
    res.status(400).json({ success: false, message: 'Name and comment are required.' });
    return;
  }

  const newReview: Review = {
    id: `rev-${Date.now()}`,
    name,
    avatar: '/image/reviews/avatar1.jpg',
    location: location || 'World Traveler',
    tourName: tourName || 'Global Journey',
    rating: Number(rating) || 5,
    date: 'Just now',
    comment: String(comment),
    verified: true
  };

  try {
    if (mongoose.connection.readyState === 1) {
      await ReviewModel.create(newReview);
    }
  } catch (err: any) {
    console.error('Error saving review to MongoDB:', err.message);
  }

  REVIEWS_DATA.unshift(newReview);

  res.status(201).json({
    success: true,
    message: 'Thank you for your feedback! Review published.',
    data: newReview
  });
});

// Newsletter
apiRouter.post('/newsletter', async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    return;
  }

  try {
    if (mongoose.connection.readyState === 1) {
      await SubscriberModel.findOneAndUpdate(
        { email },
        { email, subscribedAt: new Date() },
        { upsert: true }
      );
    }
  } catch (err: any) {
    console.error('Error saving subscriber to MongoDB:', err.message);
  }

  res.json({
    success: true,
    message: 'You have been subscribed to exclusive FLY FLY travel offers and secrets!'
  });
});

// ==========================================
// 🛡️ ADMIN PANEL ENDPOINTS
// ==========================================

// 1. Admin Overview & Metrics
apiRouter.get('/admin/overview', async (req: Request, res: Response) => {
  try {
    let tourCount = TOURS_DATA.length;
    let bookingCount = 0;
    let totalRevenue = 0;
    let reviewCount = REVIEWS_DATA.length;
    let subscriberCount = 0;
    let recentBookings: any[] = [];

    if (mongoose.connection.readyState === 1) {
      tourCount = await TourModel.countDocuments();
      bookingCount = await BookingModel.countDocuments();
      reviewCount = await ReviewModel.countDocuments();
      subscriberCount = await SubscriberModel.countDocuments();
      recentBookings = await BookingModel.find().sort({ createdAt: -1 }).limit(10);

      const revAgg = await BookingModel.aggregate([
        { $match: { status: 'CONFIRMED' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]);
      if (revAgg.length > 0) {
        totalRevenue = revAgg[0].total;
      }
    }

    res.json({
      success: true,
      data: {
        tourCount,
        bookingCount,
        totalRevenue,
        reviewCount,
        subscriberCount,
        recentBookings
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Admin Bookings
apiRouter.get('/admin/bookings', async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const bookings = await BookingModel.find().sort({ createdAt: -1 });
      res.json({ success: true, count: bookings.length, data: bookings });
      return;
    }
    res.json({ success: true, count: 0, data: [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.patch('/admin/bookings/:id/status', async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!['CONFIRMED', 'PENDING', 'CANCELLED'].includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status' });
      return;
    }

    if (mongoose.connection.readyState === 1) {
      const updated = await BookingModel.findOneAndUpdate(
        { bookingId: req.params.id },
        { status },
        { new: true }
      );
      if (updated) {
        res.json({ success: true, message: 'Status updated successfully', data: updated });
        return;
      }
    }
    res.json({ success: true, message: 'Status updated' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.delete('/admin/bookings/:id', async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await BookingModel.findOneAndDelete({ bookingId: req.params.id });
    }
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. Admin Tours CRUD
apiRouter.post('/admin/tours', async (req: Request, res: Response) => {
  try {
    const tourData = req.body;
    if (!tourData.title || !tourData.price || !tourData.country) {
      res.status(400).json({ success: false, message: 'Missing required tour fields (title, price, country).' });
      return;
    }

    if (!tourData.id) {
      tourData.id = tourData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) + '-' + Date.now().toString().slice(-4);
    }

    if (mongoose.connection.readyState === 1) {
      const created = await TourModel.create(tourData);
      res.status(201).json({ success: true, message: 'Tour created successfully in MongoDB', data: created });
      return;
    }

    TOURS_DATA.unshift(tourData);
    res.status(201).json({ success: true, message: 'Tour created', data: tourData });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.put('/admin/tours/:id', async (req: Request, res: Response) => {
  try {
    const tourId = req.params.id;
    const updateData = req.body;

    if (mongoose.connection.readyState === 1) {
      const updated = await TourModel.findOneAndUpdate({ id: tourId }, updateData, { new: true });
      if (updated) {
        res.json({ success: true, message: 'Tour updated in MongoDB', data: updated });
        return;
      }
    }

    const idx = TOURS_DATA.findIndex(t => t.id === tourId);
    if (idx !== -1) {
      TOURS_DATA[idx] = { ...TOURS_DATA[idx], ...updateData };
      res.json({ success: true, message: 'Tour updated', data: TOURS_DATA[idx] });
      return;
    }

    res.status(404).json({ success: false, message: 'Tour not found' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

apiRouter.delete('/admin/tours/:id', async (req: Request, res: Response) => {
  try {
    const tourId = req.params.id;
    if (mongoose.connection.readyState === 1) {
      await TourModel.findOneAndDelete({ id: tourId });
    }
    const idx = TOURS_DATA.findIndex(t => t.id === tourId);
    if (idx !== -1) TOURS_DATA.splice(idx, 1);

    res.json({ success: true, message: 'Tour deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. Cloudinary Image Upload
apiRouter.post('/admin/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No image file provided.' });
      return;
    }

    // Upload buffer to Cloudinary
    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'flyfly_tours', resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(req.file!.buffer);
    });

    res.json({
      success: true,
      message: 'Image uploaded to Cloudinary successfully',
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (err: any) {
    console.error('Cloudinary upload error:', err);
    res.status(500).json({ success: false, message: err.message || 'Upload failed' });
  }
});

// 5. Admin Subscribers List
apiRouter.get('/admin/subscribers', async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const subs = await SubscriberModel.find().sort({ subscribedAt: -1 });
      res.json({ success: true, count: subs.length, data: subs });
      return;
    }
    res.json({ success: true, count: 0, data: [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. Admin Delete Review
apiRouter.delete('/admin/reviews/:id', async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await ReviewModel.findOneAndDelete({ id: req.params.id });
    }
    const idx = REVIEWS_DATA.findIndex(r => r.id === req.params.id);
    if (idx !== -1) REVIEWS_DATA.splice(idx, 1);

    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});
