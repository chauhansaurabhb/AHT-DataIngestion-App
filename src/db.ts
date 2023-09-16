import { createConnection, Connection } from 'typeorm';

export const connectDatabase = async (): Promise<Connection> => {
  try {
    const connection = await createConnection();
    console.log('Database connected');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};