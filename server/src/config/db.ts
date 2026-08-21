import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { TourModel } from '../models/Tour.js';
import { ReviewModel } from '../models/Review.js';
import { TOURS_DATA, REVIEWS_DATA } from '../data.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://techinfiniton_db_user:iSp6uFqK56tVCWoU@cluster0.jk1uvve.mongodb.net/flyfly_tour_db?retryWrites=true&w=majority&appName=Cluster0';

export async function connectDB(): Promise<boolean> {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB Atlas successfully!');

    // Seed initial data if collections are empty
    await seedInitialData();
    return true;
  } catch (error: any) {
    console.warn('⚠️ MongoDB connection warning (will use resilient in-memory/fallback mode):', error.message);
    return false;
  }
}

async function seedInitialData() {
  try {
    const tourCount = await TourModel.countDocuments();
    if (tourCount === 0) {
      console.log('🌱 Seeding initial tour data to MongoDB...');
      await TourModel.insertMany(TOURS_DATA);
      console.log('✅ Initial tours seeded successfully!');
    }

    const reviewCount = await ReviewModel.countDocuments();
    if (reviewCount === 0) {
      console.log('🌱 Seeding initial reviews to MongoDB...');
      await ReviewModel.insertMany(REVIEWS_DATA);
      console.log('✅ Initial reviews seeded successfully!');
    }
  } catch (err: any) {
    console.error('Seeding error (non-fatal):', err.message);
  }
}
