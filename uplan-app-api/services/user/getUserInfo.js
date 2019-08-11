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
    const moduleList = await Promise.all(semesters.map(async (s) => {
      params = {
        TableName: ModulesTable,
        KeyConditionExpression: "semesterId = :semesterId",
        ExpressionAttributeValues: {
          ":semesterId": s.semesterId,
        }
      };

      const { Items: modules } = await dynamoDbLib.call("query", params);
      return modules;
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
      moduleList,
      tags,
    });
  } catch (e) {
    return failure({ status: false });
  }
}