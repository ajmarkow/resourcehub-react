const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY:
    "pk_test_51IHZ40JnMfBcpvMVd9HyOjgDNgpXj9y5aPc1X2qsyLN1csnVRfFplxRI8trhTfQcYPyLgf4MC0WbcXZXSqUvjSL200x7QnRK6p",
  s3: {
    REGION: process.env.REACT_APP_API_REGION,
    BUCKET: process.env.REACT_APP_BUCKET,
  },
  apiGateway: {
    REGION: process.env.REACT_APP_API_REGION,
    URL: process.env.REACT_APP_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_API_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_ID_POOL_ID,
  },
};

export default config;
