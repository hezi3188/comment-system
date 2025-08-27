import { configDotenv } from 'dotenv';
import knex, { Knex } from 'knex';

configDotenv();
const config: Knex.Config = {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    },
    pool: { min: 0, max: 10 },
};

const db = knex(config);
export default db;
