export default async (req, res) => {
  // Delete TrainingJob
  const { id } = req.params;

  try {
    const response = await fetch(
      `https://api.openai.com/v1/fine_tuning/jobs/${id}/cancel`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error deleting training job.' });
  }
};
