import { AnyZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export type Schemas = { body?: AnyZodObject; params?: AnyZodObject; query?: AnyZodObject };

export function validate(schemas: Schemas) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schemas.body) req.body = schemas.body.parse(req.body);
            if (schemas.params) req.params = schemas.params.parse(req.params);
            if (schemas.query) req.query = schemas.query.parse(req.query);
            return next();
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: 'ValidationError', issues: err.issues });
            }
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'BadRequest' });
        }
    };
}
