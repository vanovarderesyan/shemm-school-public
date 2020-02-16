import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class ServiceNameMethod extends bookshelf.Model<ServiceNameMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.SERVICE_NAME;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default ServiceNameMethod;
