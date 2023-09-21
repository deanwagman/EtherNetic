import { useState, useEffect } from 'react';

export default () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    fetch('/api/prompts')
      .then((response) => response.json())
      .then((data) => setPrompts(data));
  }, []);

  return prompts;
};
