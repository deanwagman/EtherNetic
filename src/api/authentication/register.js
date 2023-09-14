import db from '../../db';
import { generate as generateToken } from '../../util/jwt';
import bcrypt from 'bcrypt';

export const post = async (req, res) => {
  const { body } = req;
  const { username, password, email } = body;

  // Check Validations
  if (!username || !password || !email) {
    res.status(400).send({ error: 'Missing field required' });
    return;
  }

  // Check if username already exists
  const user = await db.User.findOne({ where: { username } });

  if (user) {
    res.status(400).send({ error: 'User already exists' });
    return;
  }

  try {
    // Hash and salt the password
    const saltRounds = 10; // You can adjust this value
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await db.User.create({
      username,
      password: hashedPassword,
      email,
    });

    // Generate token
    const token = generateToken(newUser.id);
    res.cookie('token', token, {
      httpOnly: true,
    });

    // Send response
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err });
    return;
  }
};
