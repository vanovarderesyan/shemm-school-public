import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class WarehouseMethod extends bookshelf.Model<WarehouseMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.WAREHOUSE;
  }
}

export default WarehouseMethod;
