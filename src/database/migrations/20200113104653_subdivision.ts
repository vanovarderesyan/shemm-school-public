import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.SUBDIVISION, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
      table.string('code', 1000).unique('code').notNullable();
      table.timestamps(true, true);
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.SUBDIVISION);
}
