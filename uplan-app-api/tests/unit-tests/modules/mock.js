import _ from 'lodash';
import uuid from "uuid";

export const moduleExist = 'mod-1';
export const userExist = 'user-1';
export const success = (body) => body;
export const failure = (body) => body;

export const sampleModule = {
  userId: userExist,
  moduleId: uuid.v4(),
  semesterId: "sem-1",
  code: "XXX",
  description: 'Sample module',
  credits: 4,
};

const data = {
  "moduleTable": {
    [userExist]: {
      [moduleExist]: {
        moduleId: 'mod-1',
        userId: 'user-1',
        semesterId: 'sem-1'
      },
    }
  }
};

const get = async (tableName, keys) => {
  let val = data[tableName];
  await Promise.all(Object.keys(keys).map(async k => {
    val = _.get(val, `${keys[k]}`, null);
    await setTimeout(function(){}, 1000)
  }));
  return { Item: val };
};

const getAll = async (tableName, userId) => {
  let val = data[tableName];
  await setTimeout(function(){}, 1000);
  return { Items: _.get(val, `${userId}`, {}) };
};

// Mock del acts like get
const del = async (tableName, keys) => {
  let val = data[tableName];
  await Promise.all(Object.keys(keys).map(async k => {
    val = _.get(val, `${keys[k]}`, null);
    await setTimeout(function(){}, 1000)
  }));
  return { Attributes: val };
};

// Always succeed in AWS put function
const create = async (tableName, item) => {
  await setTimeout(function(){}, 1000);
};

// Always succeed in AWS update function
const update = async (tableName, userId, data) => {
  await setTimeout(function(){}, 1000);
  return { Attributes: data };
};

export default {
  get,
  del,
  create,
  getAll,
  update
}
