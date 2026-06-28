"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express_1.default.json());
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
};
const buildResourceResponse = (items) => ({
    apiBaseUrl: getApiBaseUrl(),
    count: items.length,
    results: items,
});
const buildUserResponse = async () => {
    const users = await user_1.User.find({}).lean();
    return buildResourceResponse(users.map((item) => ({
        id: String(item._id),
        name: item.name,
        description: `${item.fitnessGoal} • ${item.experienceLevel}`,
    })));
};
const buildTeamResponse = async () => {
    const teams = await team_1.Team.find({}).lean();
    return buildResourceResponse(teams.map((item) => ({
        id: String(item._id),
        name: item.name,
        description: `${item.sport} • ${item.members.join(', ')}`,
    })));
};
const buildActivityResponse = async () => {
    const activities = await activity_1.Activity.find({}).lean();
    return buildResourceResponse(activities.map((item) => ({
        id: String(item._id),
        name: item.title,
        description: `${item.type} • ${item.durationMinutes} mins • ${item.caloriesBurned} kcal`,
    })));
};
const buildLeaderboardResponse = async () => {
    const leaderboardEntries = await leaderboard_1.LeaderboardEntry.find({}).lean();
    return buildResourceResponse(leaderboardEntries.map((item) => ({
        id: String(item._id),
        name: item.userName,
        description: `${item.category} • ${item.score} pts`,
    })));
};
const buildWorkoutResponse = async () => {
    const workouts = await workout_1.Workout.find({}).lean();
    return buildResourceResponse(workouts.map((item) => ({
        id: String(item._id),
        name: item.name,
        description: `${item.focus} • ${item.difficulty} • ${item.estimatedDuration}`,
    })));
};
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        apiBaseUrl: getApiBaseUrl(),
    });
});
app.get('/api/users', async (_req, res) => {
    res.json(await buildUserResponse());
});
app.get('/api/users/', async (_req, res) => {
    res.json(await buildUserResponse());
});
app.post('/api/users', async (req, res) => {
    const newUser = await user_1.User.create({
        name: req.body.name || 'New User',
        email: req.body.email || 'newuser@example.com',
        fitnessGoal: req.body.fitnessGoal || 'Stay active',
        experienceLevel: req.body.experienceLevel || 'Beginner',
    });
    res.status(201).json({
        id: String(newUser._id),
        name: newUser.name,
        description: `${newUser.fitnessGoal} • ${newUser.experienceLevel}`,
    });
});
app.get('/api/teams', async (_req, res) => {
    res.json(await buildTeamResponse());
});
app.get('/api/teams/', async (_req, res) => {
    res.json(await buildTeamResponse());
});
app.post('/api/teams', async (req, res) => {
    const newTeam = await team_1.Team.create({
        name: req.body.name || 'New Team',
        sport: req.body.sport || 'Fitness',
        members: req.body.members || [],
    });
    res.status(201).json({
        id: String(newTeam._id),
        name: newTeam.name,
        description: `${newTeam.sport} • ${newTeam.members.join(', ')}`,
    });
});
app.get('/api/activities', async (_req, res) => {
    res.json(await buildActivityResponse());
});
app.get('/api/activities/', async (_req, res) => {
    res.json(await buildActivityResponse());
});
app.post('/api/activities', async (req, res) => {
    const newActivity = await activity_1.Activity.create({
        title: req.body.title || 'New Activity',
        type: req.body.type || 'Fitness',
        durationMinutes: req.body.durationMinutes || 30,
        caloriesBurned: req.body.caloriesBurned || 250,
    });
    res.status(201).json({
        id: String(newActivity._id),
        name: newActivity.title,
        description: `${newActivity.type} • ${newActivity.durationMinutes} mins • ${newActivity.caloriesBurned} kcal`,
    });
});
app.get('/api/leaderboard', async (_req, res) => {
    res.json(await buildLeaderboardResponse());
});
app.get('/api/leaderboard/', async (_req, res) => {
    res.json(await buildLeaderboardResponse());
});
app.post('/api/leaderboard', async (req, res) => {
    const newEntry = await leaderboard_1.LeaderboardEntry.create({
        userName: req.body.userName || 'New User',
        score: req.body.score || 0,
        category: req.body.category || 'General',
    });
    res.status(201).json({
        id: String(newEntry._id),
        name: newEntry.userName,
        description: `${newEntry.category} • ${newEntry.score} pts`,
    });
});
app.get('/api/workouts', async (_req, res) => {
    res.json(await buildWorkoutResponse());
});
app.get('/api/workouts/', async (_req, res) => {
    res.json(await buildWorkoutResponse());
});
app.post('/api/workouts', async (req, res) => {
    const newWorkout = await workout_1.Workout.create({
        name: req.body.name || 'New Workout',
        focus: req.body.focus || 'General',
        difficulty: req.body.difficulty || 'Beginner',
        estimatedDuration: req.body.estimatedDuration || '20 mins',
    });
    res.status(201).json({
        id: String(newWorkout._id),
        name: newWorkout.name,
        description: `${newWorkout.focus} • ${newWorkout.difficulty} • ${newWorkout.estimatedDuration}`,
    });
});
const start = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.warn('MongoDB connection unavailable, continuing without it:', error);
    }
    app.listen(PORT, () => {
        console.log(`Backend listening on port ${PORT}`);
    });
};
void start();
