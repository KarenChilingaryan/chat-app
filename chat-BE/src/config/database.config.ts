import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

interface IDatabaseConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    logging?: boolean | ((sql: string, timing?: number) => void);
    ssl?: boolean;
  };
}

const config: IDatabaseConfig = {
  development: {
    username: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    host: process.env.DATABASE_HOST as string,
    dialect: 'postgres',
    logging: console.log,
  },
  production: {
    username: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    host: process.env.DATABASE_HOST as string,
    dialect: 'postgres',
    logging: false,
    ssl: process.env.NODE_ENV === 'production' ? true : false, 
  },
};

export default config;
