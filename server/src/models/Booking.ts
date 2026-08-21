import mongoose, { Schema, Document } from 'mongoose';

export interface IBookingDocument extends Document {
  bookingId: string;
  tourId: string;
  tourTitle: string;
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  passengers: number;
  promoCodeApplied: string | null;
  discountAmount: number;
  total: number;
  notes: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  createdAt: Date;
}

const BookingSchema = new Schema({
  bookingId: { type: String, required: true, unique: true, index: true },
  tourId: { type: String, required: true },
  tourTitle: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: 'N/A' },
  travelDate: { type: String, required: true },
  passengers: { type: Number, default: 1 },
  promoCodeApplied: { type: String, default: null },
  discountAmount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['CONFIRMED', 'PENDING', 'CANCELLED'], default: 'CONFIRMED' }
}, { timestamps: true });

export const BookingModel = mongoose.model<IBookingDocument>('Booking', BookingSchema);
