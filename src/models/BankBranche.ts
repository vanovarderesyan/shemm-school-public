import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class BankBranche extends bookshelf.Model<BankBranche> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.BANK_BRANCHE;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default BankBranche;
