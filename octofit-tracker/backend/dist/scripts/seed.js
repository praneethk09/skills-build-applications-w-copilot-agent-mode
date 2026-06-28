"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data
const seed = async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.LeaderboardEntry.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.insertMany([
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
    const teams = await team_1.Team.insertMany([
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
    const activities = await activity_1.Activity.insertMany([
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
    const leaderboardEntries = await leaderboard_1.LeaderboardEntry.insertMany([
        { userName: users[0].name, score: 980, category: 'Weekly Distance' },
        { userName: users[1].name, score: 945, category: 'Workout Streak' },
    ]);
    const workouts = await workout_1.Workout.insertMany([
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
    await mongoose_1.default.disconnect();
};
seed().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
