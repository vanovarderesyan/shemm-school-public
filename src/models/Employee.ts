import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';
import Tabel from './Tabel';
import Subdivision from './Subdivision';
import Position from './Position';
import EmployeeGeneral from './EmployeeGeneral';
import Address from './Address';
import OtherInformation from './OtherInformation';
// import Addition from './Addition';
// import AccountOfEmployeeCalculations from './AccountOfEmployeeCalculations';
import EmployeePosition from './EmployeePosition';
import EmployeeAccounts from './EmployeeAccounts';
import EmployeeAddition from './EmployeeAddition';




// withRelated: ['general','addressies','otherInformation','employeePosition','employeeAccounts','employeeAddition']


class EMPLOYEE extends bookshelf.Model<EMPLOYEE> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.EMPLOYEE;
  }

  // get hasTimestamps(): boolean {
  //   return true;
  // }

  subdivision() :Subdivision{
    return this.belongsTo(Subdivision,'subdivision_id')
  }

  tabel() :Tabel{
    return this.belongsTo(Tabel,'tabel_id')
  }

  position() :Position{
    return this.belongsTo(Position,'position_id')
  }

  general():any{
    return this.hasOne(EmployeeGeneral,'employee_id')
  }


  addressies():any{
    return this.hasOne(Address,'employee_id')
  }

  otherInformation():any{
    return this.hasOne(OtherInformation,'employee_id')
  }

  employeePosition ():any{
    return this.hasMany(EmployeePosition)

  }

  employeeAccounts ():any{
    return this.hasMany(EmployeeAccounts)

  }

  employeeAddition ():any{
    return this.hasMany(EmployeeAddition)

  }
}

export default EMPLOYEE;
