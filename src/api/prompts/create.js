import db from '../../db';

export default async function createPrompt(req, res) {
  const query = `
    INSERT INTO prompts(title, description, content, category, author_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
    `;

  const { title, description, content, category, author_id = '1' } = req.body;

  const values = [title, description, content, category, author_id];

  try {
    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
