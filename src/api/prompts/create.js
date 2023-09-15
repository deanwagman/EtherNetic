import db from '../../db';

export default async function createPrompt(req, res) {
  const { title, prompt, category } = req.body;

  console.log({ title, prompt, category });

  try {
    const newPrompt = await db.Prompt.create({
      title,
      prompt,
      category,
    });

    res.status(200).json(newPrompt);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
