import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { SemestersTable } from "../../consts/tables";
import {get} from "lodash";

export async function main(event, context) {
  const params = {
    TableName: SemestersTable,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    // partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    // of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };
  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return get(result, 'Items', null)
      ? success(result.Items)
      : failure({ error: "Internal Server Error" }, 500); // not sure when will reach here
  } catch (e) {
    return failure({ error: e.message }, 500);
  }
}
