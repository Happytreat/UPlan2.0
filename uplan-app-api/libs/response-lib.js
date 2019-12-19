export function success(body) {
  return buildResponse(200, body);
}

export function failure(body, statusCode=500) {
  return buildResponse(statusCode, body);
}

export function validationError(body) {
  return buildResponse(422, { message: 'Validation Error.' });
}

// TODO: To create a general handleException method or logging system
function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}
