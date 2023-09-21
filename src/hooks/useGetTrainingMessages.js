import React, { useState, useEffect } from 'react';

export default () => {
  const [trainingMessages, setTrainingMessages] = useState([]);

  useEffect(() => {
    const getTrainingMessages = async () => {
      const response = await fetch('/api/training-messages');
      const { messages } = await response.json();

      setTrainingMessages(messages);
    };

    getTrainingMessages();
  }, []);

  return trainingMessages;
};
