import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure, validationError } from "../../libs/response-lib";
import { isValidCreateModule } from '../../utils/modules-validation';
import { ModulesTable } from "../../consts/tables";
import Modules from "./modules";

// TODO: Improve validation by creating "middleware"
export async function main(event, context) {
  const data = JSON.parse(event.body);
  const { semesterId, code, description, credits } = data;

  // Validate else throw 422
  if (!isValidCreateModule({ semesterId, code, description, credits })) {
    return validationError();
  }
  const moduleTable = new Modules(dynamoDbLib, ModulesTable);
  return moduleTable.create({
    item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      moduleId: uuid.v4(),
      semesterId,
      code,
      description,
      credits,
    },
    success,
    failure
  });
}
