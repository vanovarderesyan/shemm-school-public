import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.SERVICE_TYPE, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
    })
    .createTable(Table.SERVICE_NAME, function (table) {
      table.increments('id');
      table.string('code', 1000).notNullable();
      table
      .integer('service_type_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.SERVICE_TYPE)
      .onDelete('CASCADE');
    })

}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.SERVICE_TYPE).dropTable(Table.SERVICE_NAME);
}