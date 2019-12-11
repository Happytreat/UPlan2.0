import { get } from 'lodash';
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { SemestersTable } from "../../consts/tables";

export async function main(event, context) {
  const params = {
    TableName: SemestersTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      semesterId: event.pathParameters.id
    },
  };
  try {
    const result = await dynamoDbLib.call("get", params);
    return get(result, 'Item', null)
      ? success(result.Item)
      : failure({ error: "Item not found." }, 404);
  } catch (e) {
    return failure({ error: e.message }, 500);
  }
}
