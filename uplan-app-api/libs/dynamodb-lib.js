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

export function getAll(tableName, userId) {
  return call("query", {
    TableName: tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId
    }
  });
}

export function update(tableName, userId, data) {
  return call("update", {
    TableName: tableName,
    Key: {
      userId,
      moduleId: data.moduleId
    },
    UpdateExpression: "SET code = :code, credits =:credits, description =:description, semesterId =:semesterId",
    ExpressionAttributeValues: {
      ":code": data.code || "",
      ":description": data.description || "",
      ":credits": data.credits || 0,
      ":semesterId": data.semesterId || "",
    },
    ReturnValues: "ALL_NEW"
  });
}

export default {
  get,
  call,
  del,
  update
};
