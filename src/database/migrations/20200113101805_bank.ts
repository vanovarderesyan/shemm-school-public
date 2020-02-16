import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
  .createTable(Table.BANK, function(table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
  })
  .createTable(Table.BANK_BRANCHE, function(table) {
      table.increments('id');
      table.string('branche_code');
      table.string('branche_address').notNullable();
      table.integer('bank_id').references('bank.id').unsigned().index().onDelete('CASCADE')
  })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.BANK).dropTable(Table.BANK_BRANCHE);
}
