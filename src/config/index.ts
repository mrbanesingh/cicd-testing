import dotenv from "dotenv";

dotenv.config();

const appSetting = {
  APP_SECRET: process.env.APP_SECRET,
  BASE_URL: process.env.BASE_URL,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  // MSG_EXCHANGE_NAME: process.env.MSG_EXCHANGE_NAME,
  // MSG_BINDING_KEY: process.env.MSG_BINDING_KEY,
  // MSG_PUB_QUEUE_NAME: process.env.MSG_PUB_QUEUE_NAME,
  // EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  // APPSETTING_PUBLISH_BINDING_KEY: process.env.APPSETTING_PUBLISH_BINDING_KEY,
  // PRODUCT_WISHLIST_PUBLISH_BINDING_KEY: process.env.PRODUCT_PUBLISH_BINDING_KEY,
  // QUEUE_NAME: process.env.QUEUE_NAME,
  RATELIMIT_MAXREQUEST: process.env.RATELIMIT_MAXREQUEST,
  RATELIMIT_TIME: process.env.RATELIMIT_TIME,
  // DB_HOST: process.env.DB_HOST,
  // DB_PORT: parseInt(`${process.env.DB_PORT}`),
  // DB_USER: process.env.DB_USER,
  // DB_PASSWORD: process.env.DB_PASSWORD,
  // DB_NAME: process.env.DB_NAME,
  API_URL: process.env.API_URL,
  API_PATH: process.env.API_PATH,
  APP_PORT: process.env.APP_PORT,
  API_VERSION: process.env.API_VERSION,
  MONGODB_URI: process.env.MONGODB_URI,
};

export default appSetting;
