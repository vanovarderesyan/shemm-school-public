import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';
import UserRole from './UserRole';

class User extends bookshelf.Model<User> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.USERS;
  }

  get hasTimestamps(): boolean {
    return true;
  }

  role() :UserRole{
    return this.belongsTo(UserRole,'role_id')
  }
}

export default User;
