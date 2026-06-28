import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
const seed = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Ava Chen',
      email: 'ava@example.com',
      fitnessGoal: 'Run a half marathon',
      experienceLevel: 'Intermediate',
    },
    {
      name: 'Liam Ortiz',
      email: 'liam@example.com',
      fitnessGoal: 'Build strength',
      experienceLevel: 'Advanced',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Marathon Masters',
      sport: 'Running',
      members: [users[0].name, 'Noah Patel'],
    },
    {
      name: 'Power Squad',
      sport: 'Strength',
      members: [users[1].name, 'Mina Singh'],
    },
  ]);

  const activities = await Activity.insertMany([
    {
      title: 'Morning Run',
      type: 'Cardio',
      durationMinutes: 35,
      caloriesBurned: 420,
    },
    {
      title: 'Strength Circuit',
      type: 'Resistance',
      durationMinutes: 50,
      caloriesBurned: 510,
    },
  ]);

  const leaderboardEntries = await LeaderboardEntry.insertMany([
    { userName: users[0].name, score: 980, category: 'Weekly Distance' },
    { userName: users[1].name, score: 945, category: 'Workout Streak' },
  ]);

  const workouts = await Workout.insertMany([
    {
      name: 'Hill Intervals',
      focus: 'Cardio',
      difficulty: 'Intermediate',
      estimatedDuration: '30 mins',
    },
    {
      name: 'Upper Body Strength',
      focus: 'Strength',
      difficulty: 'Advanced',
      estimatedDuration: '45 mins',
    },
  ]);

  console.log('Seeded collections', {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboardEntries: leaderboardEntries.length,
    workouts: workouts.length,
  });

  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
