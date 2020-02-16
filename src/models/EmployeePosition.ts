import bookshelf from '../config/bookshelf';
import Position from './Position';

import Table from '../resources/enums/Table';

class EmployeePosition extends bookshelf.Model<EmployeePosition> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.EMPLOYEE_POSITION;
  }

  positon() :any{

        return this.belongsTo(Position,'position_id')

  }

}

export default EmployeePosition;
