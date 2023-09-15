import bcrypt from 'bcrypt';
import db from '../../db';
import { generate as generateToken } from '../../util/jwt';

export const post = async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  // Check Validations
  if (!username || !password) {
    res.status(400).send({ error: 'Username and password required' });
    return;
  }

  // Get user
  const user = await db.User.findOne({ where: { username } });

  if (!user) {
    res.status(400).send({ error: 'User does not exist' });
    return;
  }

  // Check password
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    res.status(400).send({ error: 'Invalid password' });
    return;
  }

  // Generate token
  const token = generateToken(user.id);

  res.cookie('token', token, {
    httpOnly: true,
  });

  // Send response
  res.status(200).send({ success: true });
};
