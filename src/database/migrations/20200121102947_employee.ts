import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.EMPLOYEE, function (table) {
      table.increments('id');
      table
        .integer('tabel_counter')
        .unique('true')
        .unsigned()
      table.string('full_name', 1000).notNullable();
      table.string('first_name', 1000).notNullable();
      table.string('last_name', 1000).notNullable();
      table.integer('subdivision_id').references('subdivision.id').unsigned().index().onDelete('CASCADE')
    })
    .createTable(Table.CONTRACT, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
    })
    .createTable(Table.DOCUMENT_TYPE, function (table) {
      table.increments('id');
      table.string('name', 1000).notNullable();
    })
    .createTable(Table.EMPLOYEE_GENERAL, function (table) {
      table.increments('id');
      table
        .integer('employee_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.EMPLOYEE)
        .onDelete('CASCADE');
      table
        .integer('profession_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.PROFESSION)
        .onDelete('CASCADE');
      table.string('gender').nullable();
      table.date('birthdate').nullable();
      table
        .integer('contract_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.CONTRACT)
        .onDelete('CASCADE');
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS)
        .onDelete('CASCADE')
      // table.string('main_addition').nullable();//հիմնական հավելում kapel havelumin
      table.date('date_of_accept').nullable();
      table.string('accepted_command').nullable();//
      table.date('release_date').nullable();//
      table.string('release_command').nullable();//
    })
    // .createTable(Table.LEGISLATIVE, function (table) {
    //   table.increments('id');
    //   table
    //     .integer('employee_id')
    //     .unsigned()
    //     .notNullable()
    //     .references('id')
    //     .inTable(Table.EMPLOYEE)
    //     .onDelete('CASCADE');
    //   //sharunakel
    //   //hashvain plan sarqel nor es sarqel
    //   table.boolean('resident').nullable();
    //   table.boolean('income').nullable();
    //   table.boolean('income_tax').nullable();//նվազացնել կուտակաինի գումարը եկամտաին հարկից

    // })
    .createTable(Table.ADDRESSES, function (table) {
      table.increments('id');
      table
        .integer('employee_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.EMPLOYEE)
        .onDelete('CASCADE');
      table.boolean('place_of_registration').notNullable();
      table.string('state').nullable();
      table.string('community').nullable();
      table.string('city').nullable();
      table.string('street').nullable();
      table.boolean('same_residence').nullable();
      table.boolean('HH_residence').nullable();
      table.string('HH_state').nullable();
      table.string('HH_community').nullable();
      table.string('HH_city').nullable();
      table.string('HH_street').nullable();
      table.string('country').nullable();
      table.string('addressee1').nullable();
      table.string('addressee2').nullable();
      table.string('addressee3').nullable();
      table.string('post').nullable();
    })
    .createTable(Table.OTHER_INFORMATION, function (table) {
      table.increments('id');
      table
        .integer('employee_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.EMPLOYEE)
        .onDelete('CASCADE');
      table.string('bank_number').notNullable();
      table.string('social_card_number').nullable();
      table
        .integer('document_type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.DOCUMENT_TYPE)
        .onDelete('CASCADE');
      table.string('passport_number').nullable();
      table.date('due_date').nullable();//տրման ամսաթիվ
      table.string('by_whom').nullable();//ում կողմից է տրվե
      table.string('nationality').nullable();//ազգություն
      table.string('another_document_number').nullable();
      table.string('phone').nullable();
      table.string('phone2').nullable();
      table.string('email').nullable();
      table.string('language').nullable();
      table.string('marital_status').nullable();
      table.string('education').nullable();
      table.string('service').nullable();//զին ծառայություն
      table.string('members_of_family').nullable();//Ընտանիքի անդամներ
    })
    .createTable(Table.EMPLOYEE_ADDITION, function (table) {
      table.increments('id');
      table
        .integer('employee_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.EMPLOYEE)
        .onDelete('CASCADE');
      table
        .integer('addition_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.ADDITION)
        .onDelete('CASCADE');
      table.string('is_main');
      table.string('money');
    })
    .createTable(Table.EMPLOYEE_POSITION, function (table) {
      table.increments('id');
      table
        .integer('position_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.POSITION)
        .onDelete('CASCADE');
      table
        .integer('employee_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.EMPLOYEE)
        .onDelete('CASCADE');
      table.date('start_of_position').nullable()
      table.date('end_of_position').nullable()
    })
    .createTable(Table.EMPLOYEE_ACCOUNTS, function (table) {
      table.increments('id');
      table
        .integer('account_of_employee_calculation_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS)
        .onDelete('CASCADE');
      table
        .integer('employee_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(Table.EMPLOYEE)
        .onDelete('CASCADE');
      table.string('percent').nullable()
      table.string('type').nullable()
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.EMPLOYEE)
    .dropTable(Table.CONTRACT)
    .dropTable(Table.DOCUMENT_TYPE)
    .dropTable(Table.EMPLOYEE_GENERAL)
    .dropTable(Table.EXPENSE_ACCOUNT)
    .dropTable(Table.EMPLOYEE_ADDITION)
    .dropTable(Table.OTHER_INFORMATION)
    .dropTable(Table.ADDRESSES)
    .dropTable(Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS)
    .dropTable(Table.EMPLOYEE_POSITION)
    .dropTable(Table.EMPLOYEE_ACCOUNTS);

}
