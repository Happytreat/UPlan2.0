export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "ap-southeast-1",
    BUCKET: "uplan-app-api-dev-attachmentsbucket-4u4s4rg0awhn"
  },
  apiGateway: {
    REGION: "ap-southeast-1",
    URL: "https://nrg11gqaz9.execute-api.ap-southeast-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-southeast-1",
    USER_POOL_ID: "ap-southeast-1_rq1GmUA9P",
    APP_CLIENT_ID: "7de614q8jddpu6latk2fe46eiq",
    IDENTITY_POOL_ID: "ap-southeast-1:74f0e24e-6ca9-4be9-9b1d-1d2f73eb742a"
  }
};
