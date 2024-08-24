import * as dotenv from 'dotenv';
dotenv.config();

export interface IEnvironment {
  APP: {
    NAME: string;
    PORT: number | string;
    ENV: string;
    ENCRYPTION_KEY: string;
  };
  DB: {
    URL: string;
  };
  JWT: {
    SECRET: string;
  };
  MAILER: {
    SMTP: string;
    HOST: string;
    PORT: string;
    EMAIL: string;
    PASSWORD: string;
  };
  AWS: {
    ACCOUNT_ID: string;
    REGION: string;
    ACCESS_KEY: string;
    SECRET: string;
    BUCKET_NAME: string;
    BUCKET_URL: string;
  };
  REDIS: {
    URL: string;
  };
}

export const ENVIRONMENT: IEnvironment = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.PORT || process.env.APP_PORT || 3000,
    ENV: process.env.APP_ENV,
    ENCRYPTION_KEY: process.env.APP_ENCRYPTION_KEY,
  },
  DB: {
    URL: process.env.DB_URL,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
  },
  MAILER: {
    SMTP: process.env.AUTH_SMTP,
    HOST: process.env.AUTH_HOST,
    PORT: process.env.AUTH_PORT,
    EMAIL: process.env.AUTH_EMAIL,
    PASSWORD: process.env.AUTH_PASSWORD,
  },
  AWS: {
    ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
    REGION: process.env.AWS_REGION,
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    SECRET: process.env.AWS_SECRET,
    BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    BUCKET_URL: process.env.AWS_BUCKET_URL,
  },
  REDIS: {
    URL: process.env.REDIS_URL,
  },
};
