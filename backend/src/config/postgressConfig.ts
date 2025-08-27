import { configDotenv } from 'dotenv';
import { Client } from 'pg';

configDotenv();
const postgressClient = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
});

export const connectDB = async () => {
    try {
        await postgressClient.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default postgressClient;
