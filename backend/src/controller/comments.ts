import db from '../db';
import CommentsStatus from '../models/enums/commentsStatus';

export async function createComment(args: { articleId: string; authorName: string; content: string }) {
    const { articleId, authorName, content } = args;
    await db('comments').insert({
        article_id: articleId,
        author_name: authorName.trim(),
        content: content.trim(),
        status: CommentsStatus.PENDING,
    });
    return { ok: true };
}

export async function getApprovedByArticle(args: { articleId: string }) {
    const { articleId } = args;
    const rows = await db('comments')
        .select('id', 'article_id', 'author_name', 'content', 'created_at')
        .where({ article_id: articleId, status: CommentsStatus.APPROVED })
        .orderBy('created_at', 'asc');
    return rows;
}
