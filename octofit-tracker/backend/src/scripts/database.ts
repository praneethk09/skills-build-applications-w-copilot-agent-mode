import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async () => {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB database: octofit_db');
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};
