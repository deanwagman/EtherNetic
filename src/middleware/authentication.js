import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import db from '../db';

config();

export default async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).send('Missing token');
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log({ payload });

    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [
      payload.id,
    ]);

    if (!rows[0]) {
      res.status(401).send('Invalid token');
      return;
    }

    req.user = rows[0];
    next();
  } catch (e) {
    console.error({ e });
    res.status(401).send('Invalid token');
  }
};
