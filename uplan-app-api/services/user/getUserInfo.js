import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { SemestersTable, ModulesTable, TagsTable } from "../../consts/tables";

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
    // will be an array of pair (semId: modules of the sem)
    const modules = await Promise.all(semesters.map(async (s) => {
      params = {
        TableName: ModulesTable,
        KeyConditionExpression: "semesterId = :semesterId",
        ExpressionAttributeValues: {
          ":semesterId": s.semesterId,
        }
      };

      const { Items: moduleList } = await dynamoDbLib.call("query", params);
      return { [s.semesterId]: moduleList };
    }));

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