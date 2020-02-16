import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {
  //հաշվարկային հաշիվ
  return knex.schema
    .createTable(Table.BILLING_ACCOUNT, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
      table.string('bank_account', 1000).notNullable(); //kapel
      table.string('account', 1000).notNullable();
      table.boolean('isMain').nullable();
      table
      .integer('partners_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.PARTNERS)
      .onDelete('CASCADE');
      table.string('serial_number', 1000).notNullable();
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.BILLING_ACCOUNT);
}