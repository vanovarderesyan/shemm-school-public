import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class Contract extends bookshelf.Model<Contract> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.CONTRACT;
  }
}

export default Contract;
