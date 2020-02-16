import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class BillingMethod extends bookshelf.Model<BillingMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.BILLING_METHOD;
  }

  // get hasTimestamps(): boolean {
  //   return true;
  // }
}

export default BillingMethod;
