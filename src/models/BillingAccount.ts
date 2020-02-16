import bookshelf from "../config/bookshelf";
import Table from '../resources/enums/Table';
import Partners from './Partners';


class BillingAccount extends bookshelf.Model<BillingAccount>{

    get requiredFetch():boolean{
        return false;
    }

    get tableName():string{
        return Table.BILLING_ACCOUNT
    }

    billingAccount(): Partners {
        return this.belongsTo(Partners,'partner_id');
    }



}

export default BillingAccount;