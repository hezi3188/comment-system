import { z } from 'zod';

export const loginBodySchema = z.object({
    username: z.string().min(1).max(64),
    password: z.string().min(1).max(128),
});

export type LoginBody = z.infer<typeof loginBodySchema>;
