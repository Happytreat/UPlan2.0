import { get } from 'lodash';

class Modules {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
    this.get = this.get.bind(this);
  }

  async get(userId, moduleId, success, failure) {
    try {
      const result = await this.db.get(this.tableName, { userId, moduleId });
      return get(result, 'Item', null)
          ? success(result.Item)
          : failure({ status: false, error: "Item not found." });
    } catch (err) {
      return failure({ status: false, error: err });
    }
  }
}

export default Modules;
