import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { SemestersTable, ModulesTable, TagsTable } from "../../consts/tables";
import { groupBy } from "lodash";

export async function main(event, context) {
  let params = {
    TableName: SemestersTable,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };
  try {
    const { Items: semesters } = await dynamoDbLib.call("query", params);
    /**
     * Should look like:
     * modules: {
     *   "semId": [{moduleId: ...}, {moduleId: ...}],
     *   "semId": [{moduleId: ...}, {moduleId: ...}],
     * }
     * */
    params = {
      TableName: ModulesTable,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": event.requestContext.identity.cognitoIdentityId
      }
    };

    const { Items: allModules } = await dynamoDbLib.call("query", params);
    const modules = groupBy(allModules, mod => mod.semesterId);

    params = {
      TableName: TagsTable,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": event.requestContext.identity.cognitoIdentityId
      }
    };

    const { Items: tags } = await dynamoDbLib.call("query", params);

    return success({
      semesters,
      modules,
      tags,
    });
  } catch (e) {
    return failure({ status: false });
  }
}
