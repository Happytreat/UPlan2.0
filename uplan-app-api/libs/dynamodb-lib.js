import AWS from "aws-sdk";

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  // AWS.Request.promise returns a promise that is either fulfilled with the
  // response data property or rejected with the response error property.
  return dynamoDb[action](params).promise();
}