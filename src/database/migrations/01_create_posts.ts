import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('id').primary();
        table.string('body').notNullable();
        table.integer('from_user')
             .notNullable()
             .references('id')
             .inTable('users');
        table.integer('to_user')
             .notNullable()
             .references('id')
             .inTable('users');
        table.dateTime('created_at');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('posts');
}