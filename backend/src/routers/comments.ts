import { Router } from 'express';
import { validate } from '../middelwares/validate';
import { createComment, getApprovedByArticle } from '../controller/comments';
import { ArticleIdParams, articleIdParamsSchema, CommentCreateBody, commentCreateBodySchema } from '../schemas/comments';
import { StatusCodes } from 'http-status-codes';

const commentsRouter = Router();

commentsRouter.post(
    '/:articleId',
    validate({ params: articleIdParamsSchema, body: commentCreateBodySchema }),
    async (req, res) => {
        const { articleId } = req.params as ArticleIdParams;
        const { authorName, content } = req.body as CommentCreateBody;
        const results = await createComment({ articleId, authorName, content });
        return res.status(StatusCodes.CREATED).json(results);
    }
);

commentsRouter.get('/:articleId', validate({ params: articleIdParamsSchema }), async (req, res) => {
    const { articleId } = req.params as unknown as ArticleIdParams;
    const rows = await getApprovedByArticle({ articleId });
    return res.json(rows);
});

export default commentsRouter;
