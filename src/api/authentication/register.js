import db from '../../db';

export const post = async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  console.log({
    username,
    password,
  });

  if (!username || !password) {
    res.status(400).send('Missing username or password');
    return;
  }

  const query =
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
  const values = [username, password];

  try {
    const { rows } = await db.query(query, values);
    res.send(rows[0]);
  } catch (error) {
    console.log(error);
  }
};
