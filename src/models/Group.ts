import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class Group extends bookshelf.Model<Group> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.GROUP;
  }
}

export default Group;
