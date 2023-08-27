import { config } from 'dotenv';
config();

import { Pool } from 'pg';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

export default {
  query: (text, params) => pool.query(text, params),
};
