import { Request, Response, NextFunction } from 'express';
import { AppError } from '../models/classes/AppError';

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Internal Server Error' : err.message;
    res.status(statusCode).json({
        status: 'error',
        message,
    });
};
