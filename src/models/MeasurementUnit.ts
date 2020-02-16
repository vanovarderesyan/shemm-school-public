import bookshelf from "../config/bookshelf";
import Table from '../resources/enums/Table';

class MeasurementUnit extends bookshelf.Model<MeasurementUnit>{

    get requireFetch(): boolean {
        return false;
    }

    get tableName(): string {
        return Table.MEASUREMENT_UNIT;
    }

    // get hasTimestamps(): boolean {
    //     return true;
    // }
}

export default MeasurementUnit;