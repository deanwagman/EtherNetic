import db from '../index';

export default async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};
