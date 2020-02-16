import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class MaterialValueMethod extends bookshelf.Model<MaterialValueMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.MATERIAL_VALUE;
  }

  // get hasTimestamps(): boolean {
  //   return true;
  // }
}

export default MaterialValueMethod;
