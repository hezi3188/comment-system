import db from '../db';
import { issueToken } from '../middelwares/auth';
import UserRoles from '../models/enums/userRoles';

export function login(args: { username: string; password: string }) {
    const { username, password } = args;
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || '1234';
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = issueToken({ username: ADMIN_USER, role: UserRoles.ADMIN });
        return { token } as const;
    }
    return null;
}

export async function listPending() {
    const rows = await db('comments')
        .select('id', 'article_id', 'author_name', 'content', 'created_at')
        .where({ status: 'pending' })
        .orderBy('created_at', 'asc');
    return rows;
}

export async function approve(args: { id: number }) {
    const updated = await db('comments').where({ id: args.id }).update({ status: 'approved' });
    return updated > 0;
}

export async function remove(args: { id: number }) {
    const deleted = await db('comments').where({ id: args.id }).del();
    return deleted > 0;
}
