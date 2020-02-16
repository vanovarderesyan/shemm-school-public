import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class EmployeeAccounts extends bookshelf.Model<EmployeeAccounts> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.EMPLOYEE_ACCOUNTS;
  }
}

export default EmployeeAccounts;
