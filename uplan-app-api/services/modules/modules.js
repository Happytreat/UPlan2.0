import { get, groupBy } from 'lodash';

class Modules {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
    this.get = this.get.bind(this);
  }

  async get({ userId, moduleId, success, failure }) {
    try {
      const result = await this.db.get(this.tableName, { userId, moduleId });
      return get(result, 'Item', null)
          ? success(result.Item)
          : failure({ error: "Item not found." }, 404);
    } catch (err) {
      return failure({ error: err.message }, 500);
    }
  }

  async create({ item, success, failure }) {
    try {
      await this.db.create(this.tableName, item);
      return success(item);
    } catch (err) {
      return failure({ error: err.message }, 500);
    }
  }

  async delete({ userId, moduleId, success, failure }) {
    try {
      const result = await this.db.del(this.tableName, { userId, moduleId });
      return get(result, 'Attributes', null)
        ? success(result.Attributes)
        : failure({ error: "Item not found." }, 404);
    } catch (err) {
      return failure({ error: err.message }, 500);
    }
  }

  async getAll({ userId, success, failure }) {
    try {
      const { Items: allModules } = await this.db.getAll(this.tableName, userId);
      const modules = groupBy(allModules, mod => mod.semesterId);
      return success({ modules });
    } catch (err) {
      return failure({ error: err.message }, 500);
    }
  }

  async update({ userId, data, success, failure }) {
    try {
      const { Attributes: updated } = await this.db.update(this.tableName, userId, data);
      return success({ updated });
    } catch (err) {
      return failure({ error: err.message }, 500);
    }
  }
}

export default Modules;
