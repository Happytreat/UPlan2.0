import AWS from "aws-sdk";

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  // AWS.Request.promise returns a promise that is either fulfilled with the
  // response data property or rejected with the response error property.
  return dynamoDb[action](params).promise();
}

export function get(tableName, keys) {
  return call("get", {
    TableName: tableName,
    Key: keys,
  });
}

export function create(tableName, item) {
  return call("put", {
    TableName: tableName,
    Item: item,
  });
}

export function del(tableName, keys) {
  return call("delete", {
    TableName: tableName,
    Key: keys,
    ReturnValues: 'ALL_OLD',
  });
}

export default {
  get,
  call,
  del
};
