import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable(Table.BILLING_METHOD, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
      table.string('abbreviation').notNullable()
    })
    .createTable(Table.CLASSIFICATION, function (table) {
      table.increments('id');
      table.integer('code').unique();
      table.string('name', 1000).notNullable();
    })
    .createTable(Table.MATERIAL_VALUE_GROUP, function (table) {
      table.increments('id');
      table.integer('code').unique();
      table.string('name', 1000).notNullable();
      table
        .integer('material_value_group_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.MATERIAL_VALUE_GROUP)
        .onDelete('CASCADE');
    })

    .createTable(Table.MATERIAL_VALUE, function (table) {
      table.increments('id');
      table.string('name');
      table.integer('measurement_unit_id').references('measurement_unit.id').unsigned().index().onDelete('CASCADE')
      table.integer('classification_id').references('classification.id').unsigned().index().onDelete('CASCADE')
      //hashiv
      table.integer('account_id').references('account_of_employee_calculations.id').unsigned().index().onDelete('CASCADE')

      table.decimal('wholesale_price').nullable();
      table.decimal('retailer_price').nullable();
      table
        .integer('currency_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.CURRENCY)
        .onDelete('CASCADE');
      table.decimal('wholesale_price_currency').nullable();

      table.decimal('characteristic').nullable();
      table.string('bar_code').nullable();
      table.string('external_code').nullable();

      table.string('hcb_coefficient').nullable();
      table.integer('billing_method_id').references('billing_method.id').unsigned().index().onDelete('CASCADE')

      table.boolean('is_aah').nullable();

      table.integer('sales_revenue_account_id').references('account_of_employee_calculations.id').unsigned().index().onDelete('CASCADE')
      table.integer('retail_revenue_account_id').references('account_of_employee_calculations.id').unsigned().index().onDelete('CASCADE')
      table.integer('sales_expense_account_id').references('account_of_employee_calculations.id').unsigned().index().onDelete('CASCADE')

      table.integer('material_value_group_id').references('material_value_group.id').unsigned().index().onDelete('CASCADE')

      // table.string('expense');
      // table.string('weighted_average', 255).notNullable();
    })
}

export function down(knex: Knex) {
  return knex.schema
    .dropTable(Table.BILLING_METHOD)
    .dropTable(Table.CLASSIFICATION)
    .dropTable(Table.MATERIAL_VALUE);
}
