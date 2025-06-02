import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').references('id').inTable('users').notNullable()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.timestamp('date_time').notNullable()
    table.boolean('is_on_diet').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
