import uuid from "uuid";
import _ from 'lodash';
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure, validationError } from "../../libs/response-lib";
import { isNonEmptyString, validate } from '../../utils/validation';
import { TagsTable } from "../../consts/tables";

// TODO: Improve validation by creating "middleware"
export async function main(event, context) {
  const data = JSON.parse(event.body);
  const { label, description, credits } = data;

  // Validate else throw 422
  const isValid = validate([
    _.isNumber(credits), // default as 0
    isNonEmptyString([label, description]),
  ]);

  if (!isValid) {
    return validationError();
  }

  const params = {
    TableName: TagsTable,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      tagId: uuid.v4(),
      label,
      description,
      credits, // required credits for tags
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ error: e.message }, 500);
  }
}
