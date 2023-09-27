import React, { useState, useEffect } from 'react';

export default () => {
  const [models, setModels] = useState([]);
  const fetchModels = async () => {
    try {
      const response = await fetch('/api/fine-tune/models');
      const models = await response.json();

      setModels(models);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return [models, fetchModels];
};
