import { configDotenv } from 'dotenv';
import cors from 'cors';
import express, { Application } from 'express';
import { errorMiddleware } from './middelwares/error';
import { StatusCodes } from 'http-status-codes';
import loggerMiddleware from './middelwares/logger';
import { AppError } from './models/classes/AppError';
import helmet from 'helmet';
import commentsRouter from './routers/comments';
import adminRouter from './routers/admin';

configDotenv();
const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/api/comments', commentsRouter);
app.use('/admin', adminRouter);

app.get('/error', (req, res) => {
    throw new AppError('This is an error message', StatusCodes.NOT_FOUND);
});

app.get('/health', (req, res) => {
    res.send('Server is up and running');
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

export default app;
