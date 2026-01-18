import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/health-companion';
const client = new MongoClient(uri);

let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db('health-companion');
    console.log('MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

export const closeDB = async () => {
  await client.close();
  console.log('MongoDB connection closed');
};