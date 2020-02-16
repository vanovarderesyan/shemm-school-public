import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class TypeOfIncomeMethod extends bookshelf.Model<TypeOfIncomeMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.TYPE_OF_INCOME;
  }
}

export default TypeOfIncomeMethod;
