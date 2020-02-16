import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class HeadPosition extends bookshelf.Model<HeadPosition> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.HEAD_POSITION;
  }
}

export default HeadPosition;
