import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Table.AAH_ACCOUNT_TYPE, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
    })
    .createTable(Table.ACCOUNT_PRODUCTS, function (table) {
      table.increments('id');
      table.date('date');
      table.string('document_number')

      table
        .integer('partners_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable(Table.PARTNERS)
        .onDelete('CASCADE');

      table.string('lines_code').nullable()

      table.string('contract');
      table.date('contract_date');

      table
        .integer('subsection_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.SUBSECTION)
        .onDelete('CASCADE');

      table
        .integer('analitic_group_2_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable(Table.ANALITIC_GROUP_2)
        .onDelete('CASCADE');

      table
        .integer('analitic_group_1_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable(Table.ANALITIC_GROUP_1)
        .onDelete('CASCADE');

      table.string('seria').nullable()
      table.string('number').nullable()
      table.date('date_write_off').nullable()
      table.text('comment').nullable()

      table
        .integer('aah_account_type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.AAH_ACCOUNT_TYPE)
        .onDelete('CASCADE');

      table
        .integer('warehouse_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable(Table.WAREHOUSE)
        .onDelete('CASCADE');

      table.text('address').nullable()
    }).createTable(Table.ACCOUNT_PRODUCTS_OF_PRODUCTS, function (table) {
      table.increments('id');
      table.string('tye', 1000).notNullable();
      table.integer('warehouse_id').notNullable();
      table.integer('product_code').notNullable();
      table.integer('product_name').notNullable();
      table.integer('product_count').notNullable();



    })
}

export function down(knex: Knex) {
  return knex.schema
    .dropTable(Table.SUBSECTION)
    .dropTable(Table.AAH_ACCOUNT_TYPE)
}
