import db from '../../db';

export default async (req, res) => {
  const { id } = req.params;

  try {
    const prompt = await db.Prompt.findOne({
      where: { id },
    });

    res.status(200).json(prompt);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
