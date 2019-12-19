import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { ModulesTable } from "../../consts/tables";
import Modules from "./modules";

// TODO: Update array of modules - supports multiple dnd feature implemented
// Edits an existing item's attributes, or adds a new item to the table if it does not already exist
export async function main(event, context) {
  const data = JSON.parse(event.body);
  const moduleTable = new Modules(dynamoDbLib, ModulesTable);
  return moduleTable.update({
    userId: event.requestContext.identity.cognitoIdentityId,
    data,
    success,
    failure
  });
}
