import { Router } from 'express';
import { validate } from '../middelwares/validate';
import { approve, listPending, login, remove } from '../controller/admin';
import { authMiddelware } from '../middelwares/auth';
import { LoginBody, loginBodySchema } from '../schemas/admin';
import { IdParams, idParamsSchema } from '../schemas/comments';

const adminRouter = Router();

adminRouter.post('/auth/login', validate({ body: loginBodySchema }), (req, res) => {
    const { username, password } = req.body as LoginBody;
    const result = login({ username, password });
    if (!result) return res.status(401).json({ error: 'Invalid credentials' });
    return res.json(result);
});

adminRouter.get('/comments/pending', authMiddelware, async (_req, res) => {
    const rows = await listPending();
    return res.json(rows);
});

adminRouter.post('/comments/:id/approve', authMiddelware, validate({ params: idParamsSchema }), async (req, res) => {
    const { id } = req.params as unknown as IdParams;
    const ok = await approve({ id });
    if (!ok) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true });
});

adminRouter.delete('/comments/:id', authMiddelware, validate({ params: idParamsSchema }), async (req, res) => {
    const { id } = req.params as unknown as IdParams;
    const ok = await remove({ id });
    if (!ok) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true });
});

export default adminRouter;
