import { z } from 'zod';

export const articleIdParamsSchema = z.object({
    articleId: z.string().min(1).max(100),
});

export const commentCreateBodySchema = z.object({
    authorName: z.string().min(1, 'authorName is required').max(120),
    content: z.string().min(1, 'content is required').max(5000),
});

export const idParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export type ArticleIdParams = z.infer<typeof articleIdParamsSchema>;
export type CommentCreateBody = z.infer<typeof commentCreateBodySchema>;
export type IdParams = z.infer<typeof idParamsSchema>;
