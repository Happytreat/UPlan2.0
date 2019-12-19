import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { ModulesTable } from "../../consts/tables";
import Modules from "./modules";

/**
 * @return all modules of a list of semester ids:
 * modules: {
 *   "semId": [{moduleId: ...}, {moduleId: ...}],
 *   "semId": [{moduleId: ...}, {moduleId: ...}],
 * }
 * */
export async function main(event, context) {
  const moduleTable = new Modules(dynamoDbLib, ModulesTable);
  return moduleTable.getAll({
    userId: event.requestContext.identity.cognitoIdentityId,
    success,
    failure
  });
}
