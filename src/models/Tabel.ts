import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class TabelMethod extends bookshelf.Model<TabelMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.TABEL;
  }
}

export default TabelMethod;
