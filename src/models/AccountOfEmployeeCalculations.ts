import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';
import CalculationsType from './CalculationsType';
import Currency from './Currency';


class AccountOfEmployeeCalculations extends bookshelf.Model<AccountOfEmployeeCalculations> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS;
  }

  currencies(): any {
    return this.belongsToMany(Currency,'calculations_currency', 'employee_calculations_id');
  }

  calculationsType(): any {
    return this.hasOne(CalculationsType,'id','calculations_type_id');
  }

  acumulatedAccount(): any {
    return this.hasOne(AccountOfEmployeeCalculations,'id','acumulated_account_id');
  }

}

export default AccountOfEmployeeCalculations;
