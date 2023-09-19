import React, { useEffect, useState } from 'react';

const fetchOptions = async () => {
  try {
    const response = await fetch('/api/prompts/options');
    const data = await response.json();

    return data;
  } catch (e) {
    return e;
  }
};

export default () => {
  const [promptOptions, setPromptOptions] = useState([]);

  useEffect(() => {
    fetchOptions()
      .then((data) => {
        setPromptOptions(data);
      })
      .catch((e) => {
        console.log(e);
      });
    }, []);

  return promptOptions;
};
