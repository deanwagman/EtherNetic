import db from '../../db';

export default async (req, res) => {
  try {
    const prompts = await db.Prompt.findAll();

    console.log({ prompts });

    const promptOptions = prompts.map((prompt) => ({
      id: prompt.id,
      title: prompt.title,
    }));

    console.log({ promptOptions });

    res.status(200).json(promptOptions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
