import dotenv from 'dotenv';

const DEFAULT_DB_PORT = 5432;
const DEFAULT_APP_PORT = 3000;
const DEFAULT_DATABASE = 'swgocmze';
const DEFAULT_USERNAME = 'swgocmze';

dotenv.config();

const config = {
  port: process.env.PORT || DEFAULT_APP_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME || DEFAULT_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || DEFAULT_DATABASE,
  dbPort: process.env.DB_PORT || DEFAULT_DB_PORT,
};

export default {
  ...config,
  connectionString: `postgres://${config.username}:${config.password}@${config.host}:${config.dbPort}/${config.database}`,
}
