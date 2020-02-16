import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class TypeOfActionsMethod extends bookshelf.Model<TypeOfActionsMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.TYPES_OF_ACTIONS;
  }
}

export default TypeOfActionsMethod;
