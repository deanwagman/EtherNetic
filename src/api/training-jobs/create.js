export default async (req, res) => {
  try {
    // Validate the request body
    const { training_file, model } = req.body;
    console.log({ training_file, model });

    if (!training_file || typeof training_file !== 'string') {
      throw new Error('Invalid training file');
    }
    if (!model || typeof model !== 'string') {
      throw new Error('Invalid model');
    }

    // Make the API request
    const response = await fetch(`https://api.openai.com/v1/fine_tuning/jobs`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        training_file,
      }),
    });

    // Parse the response data and send it back to the client
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
