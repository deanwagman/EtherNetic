import bcrypt from 'bcrypt';
import db from '../../db';

const createUser = async ({ username, password }) => {
  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const query =
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
  const values = [username, hash];

  try {
    const { rows } = await db.query(query, values);
    const [user] = rows;

    return user;
  } catch (error) {
    console.log(error);
  }
};

export default createUser;
