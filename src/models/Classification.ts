import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class ClassificationMethod extends bookshelf.Model<ClassificationMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.CLASSIFICATION;
  }

  // get hasTimestamps(): boolean {
  //   return true;
  // }
}

export default ClassificationMethod;
