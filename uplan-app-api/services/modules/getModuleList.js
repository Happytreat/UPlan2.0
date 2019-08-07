import { forEach } from 'lodash';
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { ModulesTable } from "../../consts/tables";

// @return all modules of a given semester and total credits of the modules
export async function main(event, context) {
  const params = {
    TableName: ModulesTable,
    KeyConditionExpression: "semesterId = :semesterId",
    ExpressionAttributeValues: {
      ":semesterId": event.body.semesterId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    let totalCredits = 0;
    forEach(result, mod => { totalCredits += mod.credits; });

    return success({
      modules: result.Items,
      totalCredits,
    });
  } catch (e) {
    return failure({ status: false });
  }
}