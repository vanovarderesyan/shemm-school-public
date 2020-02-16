import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class ServiceTypeMethod extends bookshelf.Model<ServiceTypeMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.SERVICE_TYPE;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default ServiceTypeMethod;
