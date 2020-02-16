import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.SUMMARY_DATA, function (table) {
      table.increments('id');
      table
      .integer('employee_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.EMPLOYEE)
      .onDelete('CASCADE');
      table.integer('subdivision_id').references('subdivision.id').unsigned().index().onDelete('CASCADE')

      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.SUMMARY_DATA);
}
