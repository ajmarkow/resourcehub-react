const config = {
  s3: {
    REGION: "us-west-2",
    BUCKET: "resourcehubposts",
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://gwx1pf1drh.execute-api.us-west-2.amazonaws.com/dev/",
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_wXNeeZx6R",
    APP_CLIENT_ID: "1f2du8himti5048uu5gu1v5q6",
    IDENTITY_POOL_ID: "us-west-2:61410108-c255-4867-abd2-cbdcfe4fff9f",
  },
};

export default config;