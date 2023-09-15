import db from '../../db';

export default async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the prompt
    const prompt = await db.Prompt.destroy({
      where: { id },
    });

    // Send back a 200 response with the deleted prompt
    res.status(200).json(prompt);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
