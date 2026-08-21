import mongoose, { Schema, Document } from 'mongoose';

export interface IReviewDocument extends Document {
  id: string;
  name: string;
  avatar: string;
  location: string;
  tourName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const ReviewSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String, default: '/image/reviews/avatar1.jpg' },
  location: { type: String, default: 'World Traveler' },
  tourName: { type: String, default: 'Global Expedition' },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  date: { type: String, default: 'Just now' },
  comment: { type: String, required: true },
  verified: { type: Boolean, default: true }
}, { timestamps: true });

export const ReviewModel = mongoose.model<IReviewDocument>('Review', ReviewSchema);
