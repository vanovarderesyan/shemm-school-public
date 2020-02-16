import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class CalculationsType extends bookshelf.Model<CalculationsType> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.ACCOUNT_OF_EMPLOYEE_CALCULATIONS_TYPE;
  }
}

export default CalculationsType;
