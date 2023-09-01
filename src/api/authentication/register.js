import db from '../../db';
import getUsername from '../../db/users/getUsername';
import createUser from '../../db/users/createUser';
import { generate as generateToken } from '../../util/jwt';

export const post = async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  // Check Validations
  if (!username || !password) {
    res.status(400).send({ error: 'Username and password required' });
    return;
  }

  // Check if username already exists
  const user = await getUsername(username);

  if (user) {
    res.status(400).send({ error: 'User already exists' });
    return;
  }

  // Create new user
  const { id } = await createUser({ username, password });

  const token = generateToken(id);

  res.cookie('token', token, {
    httpOnly: true,
  });

  // Send response
  res.status(200).send({ success: true });
};
