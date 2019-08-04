export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "ap-southeast-1",
    BUCKET: "uplan-app-uploads"
  },
  apiGateway: {
    REGION: "ap-southeast-1",
    URL: "https://nrg11gqaz9.execute-api.ap-southeast-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-southeast-1",
    USER_POOL_ID: "ap-southeast-1_s6AfaLltO",
    APP_CLIENT_ID: "467trou0fbnm1l9c19akv9b80",
    IDENTITY_POOL_ID: "ap-southeast-1:7ced466c-e448-416d-a8e0-a6e7bde6efa4"
  }
};