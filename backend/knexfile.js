require('dotenv').config();

module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    },
    migrations: {
        directory: './migrations',
        tableName: 'knex_migrations',
    },
};
