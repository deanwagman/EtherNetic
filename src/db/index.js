// This is from previous db implementation, remove after migration

// import { config } from 'dotenv';
// config();

// import { Pool } from 'pg';

// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

// const pool = new Pool({
//   host: DB_HOST,
//   user: DB_USER,
//   database: DB_DATABASE,
//   password: DB_PASSWORD,
//   port: DB_PORT,
// });

// export default {
//   query: (text, params) => pool.query(text, params),
// };

import { config } from 'dotenv';
import Sequelize from 'sequelize';

import UserModel from './models/User';

config();

const db = {};
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  );
  
db.User = UserModel(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
