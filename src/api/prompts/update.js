import db from '../../db';

export default async (req, res) => {
  const { id } = req.params;

  try {
    // Update the prompt
    const prompt = await db.Prompt.update(req.body, {
      where: { id },
      returning: true,
      plain: true,
    });

    // Send back a 200 response with the updated prompt
    res.status(200).json(prompt[1]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
