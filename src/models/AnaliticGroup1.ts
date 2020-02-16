import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class AnaliticGroup1 extends bookshelf.Model<AnaliticGroup1> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.ANALITIC_GROUP_1;
  }

  parent():any{
    return this.belongsTo(AnaliticGroup1,'analitic_group_1_id')
}
}

export default AnaliticGroup1;
