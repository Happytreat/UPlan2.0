import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { TagsTable } from "../../consts/tables";

export async function main(event, context) {
  const params = {
    TableName: TagsTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      tagId: event.pathParameters.id
    }
  };
  try {
    await dynamoDbLib.call("delete", params);
    return success({ tagId: event.pathParameters.id });
  } catch (e) {
    return failure({ err: e });
  }
}