import { filter, map } from 'lodash';
import { success, failure } from "../../libs/response-lib";
import { ModulesTable, SemestersTable } from "../../consts/tables";
import * as dynamoDbLib from "../../libs/dynamodb-lib";

/**
 * Delete Semester and all modules associated with it
 * */
export async function main(event, context) {
  const deleteSemester = {
    TableName: SemestersTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      semesterId: event.pathParameters.semesterId
    }
  };

  const getAllModules = {
    TableName: ModulesTable,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    }
  };

  try {
    // Delete all modules in semester
    const { Items: allModules } = await dynamoDbLib.call("query", getAllModules);
    const filteredModules = filter(allModules, mod => mod.semesterId === event.pathParameters.semesterId);
    await Promise.all(map(filteredModules, async mod => {
      const params = {
        TableName: ModulesTable,
        Key: {
          userId: event.requestContext.identity.cognitoIdentityId,
          moduleId: mod.moduleId
        }
      };
      await dynamoDbLib.call("delete", params);
    }));

    await dynamoDbLib.call("delete", deleteSemester);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
