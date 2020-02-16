import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class AnaliticGroup2 extends bookshelf.Model<AnaliticGroup2> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.ANALITIC_GROUP_2;
  }

  parent():any{
      return this.belongsTo(AnaliticGroup2,'analitic_group_2_id')
  }
}

export default AnaliticGroup2;
