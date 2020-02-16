import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class ProfessionMethod extends bookshelf.Model<ProfessionMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.PROFESSION;
  }
}

export default ProfessionMethod;
