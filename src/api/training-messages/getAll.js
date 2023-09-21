import db from '../../db';

export default async (req, res) => {
  try {
    // Get Training Messages
    const messages = await db.TrainingMessage.findAll({
      order: [['createdAt', 'DESC']],
    });

    console.log({ messages });

    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
