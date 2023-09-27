export default async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch('https://api.openai.com/v1/fine_tuning/jobs', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const { data } = await response.json();

    // Send back a 200 response with the deleted prompt
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
