/** @param {import('knex').Knex} knex */
exports.up = async function (knex) {
    await knex.schema.raw("CREATE TYPE comment_status AS ENUM ('pending','approved');").catch(() => {});

    await knex.schema.createTable('comments', (table) => {
        table.increments('id').primary();
        table.string('article_id').notNullable().index();
        table.string('author_name', 120).notNullable();
        table.text('content').notNullable();
        table.specificType('status', 'comment_status').notNullable().defaultTo('pending');
        table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.raw('CREATE INDEX IF NOT EXISTS comments_article_status_idx ON comments (article_id, status);');
};

/** @param {import('knex').Knex} knex */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('comments');
    await knex.schema.raw('DROP TYPE IF EXISTS comment_status;');
    await knex.schema.raw('DROP INDEX IF EXISTS comments_article_status_idx;');
};
