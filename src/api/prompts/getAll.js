import db from '../../db';

export default async (req, res) => {
  try {
    const prompts = await db.Prompt.findAll();

    res.status(200).json(prompts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
