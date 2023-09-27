export default async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    console.log({ response });

    const { data } = await response.json();

    const sortedModels = data.sort((a, b) => {
      if (a.owner === 'openai') {
        return -1;
      }

      if (b.owner === 'openai') {
        return 1;
      }

      return 0;
    });

    res.status(200).json(sortedModels);
  } catch (error) {
    console.error(error);
  }
};
