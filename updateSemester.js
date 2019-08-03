import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "semesters",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      semesterId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    // since name is a reserved keyword we need ExpressionAttributeNames
    // https://stackoverflow.com/questions/48653365/update-attribute-timestamp-reserved-word
    UpdateExpression: "SET #semesterName = :name, attachment =:attachment, description =:description",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":name": data.name || null,
      ":description": data.description || null,
    },
    ExpressionAttributeNames: {
      "#semesterName": "name"
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}