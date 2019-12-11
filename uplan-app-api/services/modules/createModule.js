import uuid from "uuid";
import _ from 'lodash';
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure, validationError } from "../../libs/response-lib";
import { isNonEmptyString, validate } from '../../utils/validation';
import { ModulesTable } from "../../consts/tables";

// TODO: Improve validation by creating "middleware"
export async function main(event, context) {
  const data = JSON.parse(event.body);
  const { semesterId, code, description, credits } = data;

  // Validate else throw 422
  const isValid = validate([
    _.isNumber(credits),
    isNonEmptyString([code, semesterId]),
  ]);

  if (!isValid) {
    return validationError({ message: 'Validation Error.' });
  }

  const params = {
    TableName: ModulesTable,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      moduleId: uuid.v4(),
      semesterId,
      code,
      description,
      credits,
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ error: e.message }, 500);
  }
}
