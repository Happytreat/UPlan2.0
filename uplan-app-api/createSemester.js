import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "semesters",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      semesterId: uuid.v1(),
      name: data.name,
      description: data.description,
      attachment: data.attachment,
    }
  };
  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}