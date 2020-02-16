import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.BILLING_SHEET, function (table) {
      table.increments('id');
      table
      .integer('employee_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.EMPLOYEE)
      .onDelete('CASCADE');
      table.integer('subdivision_id').references('subdivision.id').unsigned().index().onDelete('CASCADE')

      table.string('date', 1000).notNullable();
      table.boolean('show_hours').notNullable();
      table.boolean('expanded').notNullable();      
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.BILLING_SHEET);
}
