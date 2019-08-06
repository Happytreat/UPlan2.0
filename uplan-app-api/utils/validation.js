import _ from 'lodash';

// validators: [validator.isEmail('foo@bar.com')]
export const validate = (validators) => {
  return _.findIndex(validators, x => x === false) === -1;
};

export const isNonEmptyString = (strArray) => {
  return _.findIndex(strArray, str => str.length === 0) === -1;
};