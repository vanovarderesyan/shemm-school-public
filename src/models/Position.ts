import bookshelf from "../config/bookshelf";
import Table from '../resources/enums/Table';
import Subdivision from './Subdivision';
import EmployeePosition from './EmployeePosition';


class Position extends bookshelf.Model<Position>{

    get requireFetch(): boolean {
        return false;
    }

    get tableName(): string {
        return Table.POSITION;
    }


    subdivision(): Subdivision {
        return this.belongsTo(Subdivision, 'subdivision_id');
    }

    employee_position():any{
        return this.belongsTo(EmployeePosition, 'position_id');
    }
}

export default Position;