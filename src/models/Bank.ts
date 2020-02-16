import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class Bank extends bookshelf.Model<Bank> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.BANK;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default Bank;
