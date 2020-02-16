import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class AccountantPosition extends bookshelf.Model<AccountantPosition> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.ACCOUNTANT_POSITION;
  }
}

export default AccountantPosition;
