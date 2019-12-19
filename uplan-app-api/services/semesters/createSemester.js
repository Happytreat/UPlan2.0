import uuid from "uuid";
import _ from 'lodash';
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure, validationError } from "../../libs/response-lib";
import { isNonEmptyString, validate } from '../../utils/validation';
import { SemestersTable } from "../../consts/tables";

// TODO: Improve validation by creating "middleware"
export async function main(event, context) {
  const data = JSON.parse(event.body);
  const { name, description, attachment, order } = data;

  // Validate else throw 422
  const isValid = validate([
    _.isNumber(order),
    isNonEmptyString([name, description]),
  ]);

  if (!isValid) {
    return validationError();
  }

  const params = {
    TableName: SemestersTable,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      semesterId: uuid.v4(),
      name,
      description,
      attachment,
      order,
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ error: e.message }, 500);
  }
}
