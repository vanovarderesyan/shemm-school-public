import bookshelf from '../config/bookshelf';

import Table from '../resources/enums/Table';

class OtherInformation extends bookshelf.Model<OtherInformation> {
  get requireFetch() {
    return false;
  }

  get tableName(): string {
    return Table.OTHER_INFORMATION;
  }
}

export default OtherInformation;
