import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userName: string;
  score: number;
  category: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  category: { type: String, required: true },
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
