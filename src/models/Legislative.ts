import bookshelf from "../config/bookshelf";
import Table from '../resources/enums/Table';

class Legislative extends bookshelf.Model<Legislative>{

    get requireFetch(): boolean {
        return false;
    }

    get tableName(): string {
        return Table.LEGISLATIVE;
    }


}

export default Legislative;