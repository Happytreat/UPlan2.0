import _ from 'lodash';

const data = {
  "moduleTable": {
    'user-1': {
      'mod-1': {
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

export default {
  get
}
