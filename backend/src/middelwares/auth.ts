import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export function issueToken(payload: object) {
    const secret = process.env.JWT_SECRET || '';
    return jwt.sign(payload, secret, { expiresIn: '12h' });
}

export function authMiddelware(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization || '';
    const [scheme, token] = auth.split(' ');
    if (scheme !== 'Bearer' || !token) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
    try {
        const secret = process.env.JWT_SECRET || '';
        const decoded = jwt.verify(token, secret);
        (req as any).user = decoded;
        next();
    } catch (e) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
    }
}
