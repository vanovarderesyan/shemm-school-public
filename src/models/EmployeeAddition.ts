import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';
import Addition from './Addition';


class EmployeeAddition extends bookshelf.Model<EmployeeAddition> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.EMPLOYEE_ADDITION;
  }

  addition() :any{

    return this.belongsTo(Addition,'addition_id')

}

}

export default EmployeeAddition;
