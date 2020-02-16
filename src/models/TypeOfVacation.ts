import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class TypeOfVacationMethod extends bookshelf.Model<TypeOfVacationMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.TYPE_OF_VACATION;
  }
}

export default TypeOfVacationMethod;
