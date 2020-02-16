import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Table.ANALITIC_GROUP_2, function (table) {
      table.increments('id');
      table.integer('code').unique();
      table.string('name', 1000).notNullable();
      table.boolean('is_accumulate')
      table
        .integer('analitic_group_2_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.ANALITIC_GROUP_2)
        .onDelete('CASCADE');
    })
}

export function down(knex: Knex) {
  return knex.schema
    .dropTable(Table.ANALITIC_GROUP_2)
}
