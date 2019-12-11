import { groupBy } from 'lodash';
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { ModulesTable } from "../../consts/tables";

// @return all modules of a list of semester ids
export async function main(event, context) {
  /**
   * Should look like:
   * modules: {
   *   "semId": [{moduleId: ...}, {moduleId: ...}],
   *   "semId": [{moduleId: ...}, {moduleId: ...}],
   * }
   * */
  const params = {
    TableName: ModulesTable,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };
  try {
    const { Items: allModules } = await dynamoDbLib.call("query", params);
    const modules = groupBy(allModules, mod => mod.semesterId);
    // console.log(allModules);
    return success({
      modules,
    });
  } catch (e) {
    return failure({ error: e.message }, 500);
  }
}
