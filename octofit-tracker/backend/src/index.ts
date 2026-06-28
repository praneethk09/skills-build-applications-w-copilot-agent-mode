import express from 'express';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Workout } from './models/workout';
import { connectDatabase } from './scripts/database';

type ResourceItem = {
  id: string;
  name: string;
  description: string;
};

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};

const buildResourceResponse = (items: ResourceItem[]) => ({
  apiBaseUrl: getApiBaseUrl(),
  count: items.length,
  results: items,
});

const buildUserResponse = async () => {
  const users = await User.find({}).lean();
  return buildResourceResponse(
    users.map((item) => ({
      id: String(item._id),
      name: item.name,
      description: `${item.fitnessGoal} • ${item.experienceLevel}`,
    })),
  );
};

const buildTeamResponse = async () => {
  const teams = await Team.find({}).lean();
  return buildResourceResponse(
    teams.map((item) => ({
      id: String(item._id),
      name: item.name,
      description: `${item.sport} • ${item.members.join(', ')}`,
    })),
  );
};

const buildActivityResponse = async () => {
  const activities = await Activity.find({}).lean();
  return buildResourceResponse(
    activities.map((item) => ({
      id: String(item._id),
      name: item.title,
      description: `${item.type} • ${item.durationMinutes} mins • ${item.caloriesBurned} kcal`,
    })),
  );
};

const buildLeaderboardResponse = async () => {
  const leaderboardEntries = await LeaderboardEntry.find({}).lean();
  return buildResourceResponse(
    leaderboardEntries.map((item) => ({
      id: String(item._id),
      name: item.userName,
      description: `${item.category} • ${item.score} pts`,
    })),
  );
};

const buildWorkoutResponse = async () => {
  const workouts = await Workout.find({}).lean();
  return buildResourceResponse(
    workouts.map((item) => ({
      id: String(item._id),
      name: item.name,
      description: `${item.focus} • ${item.difficulty} • ${item.estimatedDuration}`,
    })),
  );
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
  const newUser = await User.create({
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
  const newTeam = await Team.create({
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
  const newActivity = await Activity.create({
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
  const newEntry = await LeaderboardEntry.create({
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
  const newWorkout = await Workout.create({
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
    await connectDatabase();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.warn('MongoDB connection unavailable, continuing without it:', error);
  }

  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
};

void start();
