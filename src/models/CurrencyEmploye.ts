import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

import Currency from './Currency'

class CurrencyEmploye extends bookshelf.Model<CurrencyEmploye> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS_CURRENCY;
  }

  currencies(): any {
    return this.hasMany(Currency,'currency_id');
  } 
}

export default CurrencyEmploye;
