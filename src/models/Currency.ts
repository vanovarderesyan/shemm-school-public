import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class Currency extends bookshelf.Model<Currency> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.CURRENCY;
  }
}

export default Currency;
