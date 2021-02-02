const config = {
  s3: {
    REGION: process.env('API_REGION'),
    BUCKET: 'resourcehubposts'
  },
  apiGateway: {
    REGION: process.env('API_REGION'),
    URL: process.env('URL'),
  },
  cognito: {
    REGION: process.env('API_REGION'),
    USER_POOL_ID: process.env('USER_POOL_ID'),
    APP_CLIENT_ID: process.env('CLIENT_ID'),
    IDENTITY_POOL_ID: process.env('ID_POOL_ID'),
  },
}