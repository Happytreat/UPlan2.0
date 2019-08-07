import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { TagsTable } from "../../consts/tables";

export async function main(event, context) {
  const params = {
    TableName: TagsTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      tagId: event.pathParameters.id
    },
  };
  try {
    const result = await dynamoDbLib.call("get", params);
    return result.Item ? success(result.Item) : failure({ status: false, error: "Item not found." });
  } catch (e) {
    return failure({ err: e.message });
  }
}