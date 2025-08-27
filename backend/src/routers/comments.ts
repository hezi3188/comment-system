import { Router } from 'express';
import { validate } from '../middelwares/validate';
import { createComment, getApprovedByArticle } from '../controller/comments';
import { ArticleIdParams, articleIdParamsSchema, CommentCreateBody, commentCreateBodySchema } from '../schemas/comments';
import { StatusCodes } from 'http-status-codes';

const commentsRouter = Router();

import { AppError } from '../models/classes/AppError';

commentsRouter.post(
    '/:articleId',
    validate({ params: articleIdParamsSchema, body: commentCreateBodySchema }),
    async (req, res, next) => {
        try {
            const { articleId } = req.params as ArticleIdParams;
            const { authorName, content } = req.body as CommentCreateBody;
            const results = await createComment({ articleId, authorName, content });
            return res.status(StatusCodes.CREATED).json(results);
        } catch (err) {
            next(new AppError('Error creating comment', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
);

commentsRouter.get('/:articleId', validate({ params: articleIdParamsSchema }), async (req, res, next) => {
    try {
        const { articleId } = req.params as unknown as ArticleIdParams;
        const rows = await getApprovedByArticle({ articleId });
        return res.json(rows);
    } catch (err) {
        next(new AppError('Error fetching approved comments', StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

export default commentsRouter;
