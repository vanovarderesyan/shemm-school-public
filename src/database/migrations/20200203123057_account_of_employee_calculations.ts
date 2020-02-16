import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

    return knex.schema
        .createTable(Table.CURRENCY, function (table) {
            table.increments('id');
            table.string('name', 1000).notNullable();
            table.string('currency', 1000).notNullable();
        })
        .createTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS_TYPE, function (table) {
            table.increments('id');
            table.string('name', 1000).notNullable();
        })
        .createTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS, function (table) {
            table.increments('id');
            table.string('name', 1000).notNullable();
            table.boolean('is_accumulated_account').nullable();//կուտակից հաշիվ
            table
                .integer('acumulated_account_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS)
                .onDelete('CASCADE');
            table.boolean('off_balance_sheet').nullable();//արտահաշվեկշռաին
            table.boolean('accounting_by_partners').nullable();//հաշվառում ըստ գործնկորների
            table.boolean('analytical_group_1').nullable();//անալիտիկ խումբ
            table.boolean('analytical_group_2').nullable();

            table
                .integer('calculations_type_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS_TYPE)
                .onDelete('CASCADE');
        })
        .createTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS_CURRENCY, function (table) {
            table.increments('id');

            table
                .integer('employee_calculations_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS)
                .onDelete('CASCADE');
            table
                .integer('currency_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable(Table.CURRENCY)
                .onDelete('CASCADE');
        })

}

export function down(knex: Knex) {
    return knex.schema.dropTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS_TYPE)
        .dropTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS)
        .dropTable(Table.CURRENCY)
}

