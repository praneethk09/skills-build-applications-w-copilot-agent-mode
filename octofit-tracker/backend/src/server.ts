import express from 'express';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Workout } from './models/workout';
import { connectDatabase } from './config/database';

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

app.get('/api/activities', async (_req, res) => {
  res.json(await buildActivityResponse());
});

app.get('/api/activities/', async (_req, res) => {
  res.json(await buildActivityResponse());
});

app.get('/api/teams', async (_req, res) => {
  res.json(await buildTeamResponse());
});

app.get('/api/teams/', async (_req, res) => {
  res.json(await buildTeamResponse());
});

app.get('/api/leaderboard', async (_req, res) => {
  res.json(await buildLeaderboardResponse());
});

app.get('/api/leaderboard/', async (_req, res) => {
  res.json(await buildLeaderboardResponse());
});

app.get('/api/workouts', async (_req, res) => {
  res.json(await buildWorkoutResponse());
});

app.get('/api/workouts/', async (_req, res) => {
  res.json(await buildWorkoutResponse());
});

export const startServer = async () => {
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

void startServer();
export { app };
