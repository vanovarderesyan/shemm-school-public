import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.GROUP, function (table) {
      table.increments('id');
      table.string('name').nullable();
      table.string('accumulator', 1000).notNullable();//կուտակիչ
    })

    .createTable(Table.HEAD_POSITION, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();//կուտակիչ
    })
    .createTable(Table.ACCOUNTANT_POSITION, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();//կուտակիչ
    })
    .createTable(Table.PARTNERS, function (table) {
      table.increments('id');
      table.string('hvhh').nullable();
      table.string('name', 1000).notNullable();
      table.string('full_name', 1000).notNullable();
      table
        .integer('group_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.GROUP)
        .onDelete('CASCADE');

      table
        .integer('head_position_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.HEAD_POSITION)
        .onDelete('CASCADE');

      table
        .integer('accountant_position_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.ACCOUNTANT_POSITION)
        .onDelete('CASCADE');

      //ընդանուր
      table.boolean('aa_hpayer').notNullable();
      table.string('legal_address').notNullable();
      table.string('practical_address').notNullable();
      table.string('head_aah').notNullable();
      table.string('accountant_aah').notNullable();
      table.string('certificate_number').notNullable();
      table.string('passport_number').notNullable();
      table.string('main_purpose_of_payment').notNullable();   //վճարման հիմնական նպատակ
      table.string('phone').notNullable();
      table.string('email').notNullable();
      table.string('contract').notNullable();
      table.string('date_contract').notNullable();
      table.string('percentage_of_sales_discount').notNullable();
      //another այլ
      table.string('another_additional_information').nullable()//լրացուցիչ տվյալներ
      table.string('another_delivery_time').nullable()//առաքման եղանակա
      table.string('another_fullname').nullable()
      table.string('another_credentials_number').nullable()//լիազորագրի համար
      table.string('another_credentials_date').nullable()

    }).createTable(Table.ADDITIONAL_ADDRESSE_PARTNERS, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();//կուտակիչ
      table
        .integer('partners_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.PARTNERS)
        .onDelete('CASCADE');
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.PARTNERS);
}
