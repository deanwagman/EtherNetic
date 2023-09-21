export default async (req, res) => {
  const { id } = req.params;

  console.log({ id, url: `https://api.openai.com/v1/files/${id}` });

  try {
    const response = await fetch(`https://api.openai.com/v1/files/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const data = await response.json();

    if (data.deleted) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
