import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";
import { TagsTable } from "../../consts/tables";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: TagsTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      tagId: event.pathParameters.id
    },
    UpdateExpression: "SET label = :label, credits =:credits, description =:description",
    ExpressionAttributeValues: {
      ":label": data.label || null,
      ":credits": data.credits || null,
      ":description": data.description || null,
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ tagId: event.pathParameters.id });
  } catch (e) {
    return failure({ error: e.message }, 500);
  }
}
