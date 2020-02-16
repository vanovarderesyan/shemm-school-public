import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class MaterialValueGroupMethod extends bookshelf.Model<MaterialValueGroupMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.MATERIAL_VALUE_GROUP;
  }

  parent():any{
    return this.belongsTo(MaterialValueGroupMethod,'material_value_group_id')
  }

}

export default MaterialValueGroupMethod;
