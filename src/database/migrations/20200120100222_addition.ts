import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    // .createTable(Table.TABLE_CODE, function (table) {
    //   table.increments('id');
    //   table.string('name', 1000).notNullable();
    // })
    .createTable(Table.EXPENSE_ACCOUNT, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
    })
    .createTable(Table.TYPE_OF_INCOME, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
    })
    .createTable(Table.TYPE_OF_VACATION, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
    })
    .createTable(Table.ADDITION, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
      table
        .integer('tabel_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.TABEL)
        .onDelete('CASCADE');
      table
        .integer('type_of_income_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.TYPE_OF_INCOME)
        .onDelete('CASCADE');
      table
        .integer('type_of_vacation_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.TYPE_OF_VACATION)
        .onDelete('CASCADE');
      table
        .integer('expense_account_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.EXPENSE_ACCOUNT)
        .onDelete('CASCADE');
      table.string('coefficient').nullable();
      table.boolean('recalculation').nullable();
      table.boolean('is_income').nullable();
      table.boolean('declining_income').nullable();
      table.boolean('is_trade_union').nullable();
      table.boolean('is_for_tax_purposes_only').nullable();//միայն հարկերի հաշվարկման համար
      table.boolean('is_mandatory_pension').nullable();//պարտադիր  թոշակ 
      table.boolean('by_the_employer_mandatory_pension').nullable();//գործատուի կողմից պարտադիր  թոշակ 
      table.boolean('participates_on_account_of_actual_hours').nullable(); //մասնակցում է փաստացի ժամերի հաշվիբ
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.TABLE_CODE)
    .dropTable(Table.TYPE_OF_INCOME)
    .dropTable(Table.TYPE_OF_VACATION)
    .dropTable(Table.EXPENSE_ACCOUNT)
    .dropTable(Table.ADDITION);
}
