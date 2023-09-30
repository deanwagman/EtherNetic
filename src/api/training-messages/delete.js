import db from '../../db';

export default async (req, res) => {
  // Delete TrainingMessage
  const { id } = req.params;

  try {
    const trainingMessage = await db.TrainingMessage.destroy({
      where: { id },
    });

    res.status(200).json(trainingMessage);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error deleting training message.' });
  }
};
