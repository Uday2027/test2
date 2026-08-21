import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriberDocument extends Document {
  email: string;
  subscribedAt: Date;
}

const SubscriberSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  subscribedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const SubscriberModel = mongoose.model<ISubscriberDocument>('Subscriber', SubscriberSchema);
