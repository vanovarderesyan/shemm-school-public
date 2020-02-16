import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.WAREHOUSE, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
      table.string('code', 1000).unique().notNullable();
      table.string('address', 1000).notNullable();
      table.string('responsible', 1000).notNullable(); //kapel
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.WAREHOUSE);
}