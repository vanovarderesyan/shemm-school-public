import * as Knex from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {

  return knex.schema
    .createTable(Table.MEASUREMENT_UNIT, function (table) {
      table.increments('id');
      table.string('code', 255).notNullable();
      table.string('unit', 255).notNullable();
      table.string('abbreviation', 255).notNullable();
    })
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.MEASUREMENT_UNIT);
}
