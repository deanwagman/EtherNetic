export default async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/files', {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    const { data } = await response.json();

    res.status(200).json({ files: data });
  } catch (error) {
    console.error('Error getting files:', error);

    res.status(500).json({ error });
  }
};
