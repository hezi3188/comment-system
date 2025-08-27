require('dotenv').config();

module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'app',
        password: process.env.DB_PASSWORD || 'app',
        database: process.env.DB_NAME || 'comments',
        port: Number(process.env.DB_PORT || 5432),
    },
    migrations: {
        directory: './migrations',
        tableName: 'knex_migrations',
    },
};
