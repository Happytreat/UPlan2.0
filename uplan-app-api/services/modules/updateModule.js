import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { ModulesTable } from "../../consts/tables";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: ModulesTable,
    Key: {
      semesterId: data.semesterId,
      moduleId: data.moduleId
    },
    UpdateExpression: "SET code = :code, credits =:credits, description =:description",
    ExpressionAttributeValues: {
      ":code": data.code || null,
      ":description": data.description || null,
      ":credits": data.credits || null,
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const res = await dynamoDbLib.call("update", params);
    return success({ updated: res.Attributes });
  } catch (e) {
    // console.log(e);
    return failure({ err: e.message });
  }
}