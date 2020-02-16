import bookshelf from '../config/bookshelf';
import Table from '../resources/enums/Table';
import ExpenseAccount from './ExpenseAccount';
import Tabel from './Tabel';
import TypeOfIncome from './TypeOfIncome';
import TypeOfVacation from './TypeOfVacation';


class AdditionMethod extends bookshelf.Model<AdditionMethod> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.ADDITION;
  }

  expenseAccount() :ExpenseAccount{
    return this.belongsTo(ExpenseAccount,'expense_account_id')
  }

  tabel() :Tabel{
    return this.belongsTo(Tabel,'tabel_id')
  }

  typeOfIncome() :TypeOfIncome{
    return this.belongsTo(TypeOfIncome,'type_of_income_id')
  }
  
  typeOfVacation() :TypeOfVacation{
    return this.belongsTo(TypeOfVacation,'type_of_vacation_id')
  }
}

export default AdditionMethod;
