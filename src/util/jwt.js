import JsonWebToken from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const { JWT_SECRET } = process.env;

export const generate = (user_id) =>
  JsonWebToken.sign({ id: user_id }, JWT_SECRET, { expiresIn: '1h' });
