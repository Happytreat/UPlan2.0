import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { ModulesTable } from "../../consts/tables";
import Modules from "./modules";

export async function main(event, context) {
  const moduleTable = new Modules(dynamoDbLib, ModulesTable);
  return moduleTable.delete({
    userId: event.requestContext.identity.cognitoIdentityId,
    moduleId: event.pathParameters.id,
    success,
    failure
  });
}
