import { Router } from 'express';
import { validate } from '../middelwares/validate';
import { approve, listPending, login, remove } from '../controller/admin';
import { AppError } from '../models/classes/AppError';
import { authMiddelware } from '../middelwares/auth';
import { LoginBody, loginBodySchema } from '../schemas/admin';
import { IdParams, idParamsSchema } from '../schemas/comments';
import { StatusCodes } from 'http-status-codes';

const adminRouter = Router();

adminRouter.post('/auth/login', validate({ body: loginBodySchema }), (req, res) => {
    const { username, password } = req.body as LoginBody;
    const result = login({ username, password });
    if (!result) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    return res.json(result);
});

adminRouter.get('/comments/pending', authMiddelware, async (_req, res, next) => {
    try {
        const rows = await listPending();
        return res.json(rows);
    } catch (err) {
        next(new AppError('Error fetching pending comments', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

adminRouter.post('/comments/:id/approve', authMiddelware, validate({ params: idParamsSchema }), async (req, res, next) => {
    try {
        const { id } = req.params as unknown as IdParams;
        const ok = await approve({ id });
        if (!ok) return res.status(StatusCodes.NOT_FOUND).json({ error: 'Not found' });
        return res.json({ ok: true });
    } catch (err) {
        next(new AppError('Error approving comment', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

adminRouter.delete('/comments/:id', authMiddelware, validate({ params: idParamsSchema }), async (req, res, next) => {
    try {
        const { id } = req.params as unknown as IdParams;
        const ok = await remove({ id });
        if (!ok) return res.status(StatusCodes.NOT_FOUND).json({ error: 'Not found' });
        return res.json({ ok: true });
    } catch (err) {
        next(new AppError('Error deleting comment', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

export default adminRouter;
