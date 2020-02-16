import bookshelf from "../config/bookshelf";
import Table from '../resources/enums/Table';
import BillingAccount from './BillingAccount';
import AdditionalAddressePartners from './AdditionalAddressePartners';


class Partners extends bookshelf.Model<Partners>{

    get requireFetch(): boolean {
        return false;
    }

    get tableName(): string {
        return Table.PARTNERS;
    }

    billingAccounts(): any {
        return this.hasMany(BillingAccount,'partners_id');
    }

    additionalAddressePartners(): any {
        return this.hasMany(AdditionalAddressePartners,'partners_id');
    }

    // subdivision(): Subdivision {
    //     return this.belongsTo(Subdivision, 'subdivision_id');
    // }
}

export default Partners;