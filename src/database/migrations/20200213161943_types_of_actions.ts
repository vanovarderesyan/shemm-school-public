import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Table.TYPES_OF_ACTIONS, function (table) {
      table.increments('id');
      table.integer('code').unique();
      table.string('name', 1000).notNullable();
    })
}

export function down(knex: Knex) {
  return knex.schema
    .dropTable(Table.TYPES_OF_ACTIONS)
}
