import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.TABEL, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
      table.string('hours', 1000).notNullable();
      table.string('year', 1000).notNullable();
      table.text('months').notNullable();
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.TABEL);
}
