import { Readable } from 'stream';
import db from '../../db';

// import env

export default async (req, res) => {
  // Get Training Messages
  const messagesSet = await db.TrainingMessage.findAll({
    order: [['createdAt', 'DESC']],
    attributes: ['messages'],
  });

  const jsonl = messagesSet
    .map((messages) => JSON.stringify(messages))
    .join('\n');

  const blob = new Blob([jsonl], { type: 'application/json' });

  const now = new Date().toISOString().replace(/:/g, '-');
  const formData = new FormData();
  formData.append('purpose', 'fine-tune');
  formData.append('file', blob, `messages-${now}.jsonl`); // Provide a filename for the stream

  try {
    const response = await fetch('https://api.openai.com/v1/files', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const data = await response.json();

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
