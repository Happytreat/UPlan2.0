import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { ModulesTable } from "../../consts/tables";

// TODO: Update array of modules - supports multiple dnd feature implemented
export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: ModulesTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      moduleId: data.moduleId
    },
    UpdateExpression: "SET code = :code, credits =:credits, description =:description, semesterId =:semesterId",
    ExpressionAttributeValues: {
      ":code": data.code || null,
      ":description": data.description || null,
      ":credits": data.credits || null,
      ":semesterId": data.semesterId || null,
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const res = await dynamoDbLib.call("update", params);
    return success({ updated: res.Attributes });
  } catch (e) {
    // console.log(e);
    return failure({ error: e.message }, 500);
  }
}
