import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.CO_WORKERS, function (table) {
      table.increments('id');
      table.string('code', 1000).notNullable();
      table.string('hvhh', 1000).notNullable();
      table.string('name', 1000).notNullable();
      table.string('creditor', 1000).notNullable();
      table.string('debetor', 1000).notNullable();

      table.string('legal_address', 1000).notNullable();
      table.string('work_address', 1000).notNullable();
      table.string('transfer_purpose', 1000).notNullable();
      table.string('inflow_account', 1000).notNullable();
      table.string('leakage_account', 1000).notNullable();

      table.string('director', 1000).notNullable(); //pti vor kapenq
      table.string('accountent', 1000).notNullable(); ///pti vor kapenq

      table.string('bank_account', 1000).notNullable(); //kapel
      table.integer('bank_id').references('bank.id').unsigned().index().onDelete('CASCADE')
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.CO_WORKERS);
}
