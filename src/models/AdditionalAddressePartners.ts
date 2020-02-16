import bookshelf from "../config/bookshelf";
import Table from '../resources/enums/Table';

class AdditionalAddressePartners extends bookshelf.Model<AdditionalAddressePartners>{

    get requiredFetch():boolean{
        return false;
    }

    get tableName():string{
        return Table.ADDITIONAL_ADDRESSE_PARTNERS
    }

}

export default AdditionalAddressePartners;