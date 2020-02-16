import bookshelf from "../config/bookshelf";
import Table from '../resources/enums/Table';

class Subdivision extends bookshelf.Model<Subdivision>{

    get requireFetch():boolean{
        return false;
    }

    get tableName():string{
        return Table.SUBDIVISION;
    }

    get hasTimestamps():boolean{
        return true;
    }

    get _count():any{
        return this.count();
    }

    
}

export default Subdivision;