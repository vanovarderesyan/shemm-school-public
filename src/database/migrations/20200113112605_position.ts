import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.POSITION, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
      table.integer('subdivision_id').references('subdivision.id').unsigned().index().onDelete('CASCADE')
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.POSITION);
}