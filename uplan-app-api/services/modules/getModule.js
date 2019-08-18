import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { ModulesTable } from "../../consts/tables";

export async function main(event, context) {
  const params = {
    TableName: ModulesTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      moduleId: event.pathParameters.id
    },
  };
  try {
    const result = await dynamoDbLib.call("get", params);
    return result.Item
      ? success(result.Item)
      : failure({ status: false, error: "Item not found." });
  } catch (e) {
    return failure({ status: false });
  }
}