import db from '../../db';

export default async (req, res) => {
    const { messages, tags } = req.body;

    if (!messages) {
        res.status(400).send({ message: 'Messages are missing.' });
        return;
    }

    try {
        const trainingMessage = await db.TrainingMessage.create({
            messages,
            tags,
        });

        res.status(200).send(trainingMessage);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error creating training message.' });
    }
} 
