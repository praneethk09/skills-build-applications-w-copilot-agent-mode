import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  focus: string;
  difficulty: string;
  estimatedDuration: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, unique: true },
  focus: { type: String, required: true },
  difficulty: { type: String, required: true },
  estimatedDuration: { type: String, required: true },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
