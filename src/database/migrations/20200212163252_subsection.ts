import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Table.SUBSECTION, function (table) {
      table.increments('id');
      table.string('name');
      table.integer('code').unique();
      table
        .integer('types_of_actions_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.TYPES_OF_ACTIONS)
        .onDelete('CASCADE');

      table
        .integer('customer_account_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS)
        .onDelete('CASCADE');
      table
        .integer('prepaid_account_received_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS)
        .onDelete('CASCADE');
      table
        .integer('aah_account_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS)
        .onDelete('CASCADE');
    })
}

export function down(knex: Knex) {
  return knex.schema
    .dropTable(Table.SUBSECTION)
}
