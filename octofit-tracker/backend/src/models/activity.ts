import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
}

const activitySchema = new Schema<IActivity>({
  title: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
