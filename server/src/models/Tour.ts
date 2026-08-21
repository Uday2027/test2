import mongoose, { Schema, Document } from 'mongoose';
import { Tour } from '../data.js';

export interface ITourDocument extends Omit<Tour, 'id'>, Document {
  id: string;
}

const TourSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  country: { type: String, required: true },
  location: { type: String, required: true },
  region: { type: String, enum: ['Asia', 'Europe', 'Africa', 'Australia', 'New Zeland', 'Americas'], required: true },
  rating: { type: Number, default: 8.5 },
  reviewCount: { type: Number, default: 0 },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  duration: { type: String, required: true },
  groupSize: { type: String, default: 'Max 12 People' },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  heroSlide: { type: Boolean, default: false },
  tag: { type: String },
  description: { type: String, required: true },
  highlights: [{ type: String }],
  itinerary: [{
    day: { type: Number },
    title: { type: String },
    desc: { type: String }
  }],
  included: [{ type: String }]
}, { timestamps: true });

export const TourModel = mongoose.model<ITourDocument>('Tour', TourSchema);
