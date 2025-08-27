import knex, { Knex } from 'knex';

const config: Knex.Config = {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'app',
        password: process.env.DB_PASSWORD || 'app',
        database: process.env.DB_NAME || 'comments',
        port: Number(process.env.DB_PORT || 5432),
    },
    pool: { min: 0, max: 10 },
};

const db = knex(config);
export default db;
