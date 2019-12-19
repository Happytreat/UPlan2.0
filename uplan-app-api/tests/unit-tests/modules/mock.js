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
        userId: 'user-1'
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

// Mock del acts like get
const del = async (tableName, keys) => {
  let val = data[tableName];
  await Promise.all(Object.keys(keys).map(async k => {
    val = _.get(val, `${keys[k]}`, null);
    await setTimeout(function(){}, 1000)
  }));
  return { Attributes: val };
};

const create = async (tableName, item) => {
  await setTimeout(function(){}, 1000);
  return;
};

export default {
  get,
  del,
  create
}
