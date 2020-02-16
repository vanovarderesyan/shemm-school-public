import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class ExpenseAccountMethod extends bookshelf.Model<ExpenseAccountMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.EXPENSE_ACCOUNT;
  }
}

export default ExpenseAccountMethod;
