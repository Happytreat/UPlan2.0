// import { forEach } from 'lodash';
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
  try {
    let modules = {};
    await Promise.all(event.body.semesters.map(async (semId) => {
      const params = {
        TableName: ModulesTable,
        KeyConditionExpression: "semesterId = :semesterId",
        ExpressionAttributeValues: {
          ":semesterId": semId,
        }
      };

      const { Items: moduleList } = await dynamoDbLib.call("query", params);
      modules[semId] = moduleList;
    }));

    return success({
      modules,
    });
  } catch (e) {
    return failure({ status: false, error: e });
  }
}