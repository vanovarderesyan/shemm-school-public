import bookshelf from "../config/bookshelf";
import Table from '../resources/enums/Table';

class CoWorkers extends bookshelf.Model<CoWorkers>{
    get requireFetch(): boolean {
        return false;
    }

    get tableName(): string {
        return Table.CO_WORKERS;
    }

    get hasTimestamps(): boolean {
        return true;
    }
}

export default CoWorkers;