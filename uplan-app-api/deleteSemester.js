import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "semesters",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      semesterId: event.pathParameters.id
    }
  };
  try {
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}