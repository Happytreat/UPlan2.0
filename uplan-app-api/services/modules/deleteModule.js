import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { ModulesTable } from "../../consts/tables";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: ModulesTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      moduleId: data.moduleId
    }
  };
  try {
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ err: e.message });
  }
}