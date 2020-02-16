import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';
import Profession from './Profession';
import Contract from './Contract';
import Addition from './Addition';



class EmployeeGeneral extends bookshelf.Model<EmployeeGeneral> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.EMPLOYEE_GENERAL;
  }

  profession() :Profession{
    return this.belongsTo(Profession,'profession_id')
  }

  contract() :Contract{
    return this.belongsTo(Contract,'contract_id')
  }

  addition() :Addition{
    return this.belongsTo(Addition,'addition_id')
  }
}

export default EmployeeGeneral;
