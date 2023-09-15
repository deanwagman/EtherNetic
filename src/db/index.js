import { config } from 'dotenv';
import Sequelize from 'sequelize';

import UserModel from './models/User';
import PromptModel from './models/Prompt';

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
db.Prompt = PromptModel(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
