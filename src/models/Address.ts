import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class Addresses extends bookshelf.Model<Addresses> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.ADDRESSES;
  }
}

export default Addresses;
