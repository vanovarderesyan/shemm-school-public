import bookshelf from "../config/bookshelf";
import Table from '../resources/enums/Table';
import AccountOfEmployeeCalculations from './AccountOfEmployeeCalculations'
import TypesOfActions from './TypesOfActions'

class Subsection extends bookshelf.Model<Subsection>{

    get requireFetch():boolean{
        return false;
    }

    get tableName():string{
        return Table.SUBSECTION;
    }

    get _count():any{
        return this.count();
    }

    customerAccount():any{
        return this.belongsTo(AccountOfEmployeeCalculations,'customer_account_id')
    }

    aahAccount():any{
        return this.belongsTo(AccountOfEmployeeCalculations,'aah_account_id')
    }

    prepaidAccountReceived():any{
        return this.belongsTo(AccountOfEmployeeCalculations,'prepaid_account_received_id')
    }

    typesOfAction():any{
        return this.belongsTo(TypesOfActions,'TypesOfActionsId')
    }
}

export default Subsection;