import bcrypt from 'bcrypt';
import db from '../../db';
import { generate as generateToken } from '../../util/jwt';
import getUsername from '../../db/users/getUsername';

export const post = async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  // Check Validations
  if (!username || !password) {
    res.status(400).send('Missing username or password');
    return;
  }

  // Get user
  const user = await getUsername(username);

  if (!user) {
    res.status(400).send('Username does not exist');
    return;
  }

  // Check password
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    res.status(400).send('Incorrect password');
    return;
  }

  // Generate token
  const token = generateToken(user.id);

  res.cookie('token', token, {
    httpOnly: true,
    // sameSite: 'strict',
    // secure: process.env.NODE_ENV === 'production',
  });

  // Send response
  res.status(200).send({ token });
};
