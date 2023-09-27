import { useState, useEffect } from 'react';

export default (resource) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
        fetch(`/api/${resource}`)
        .then((response) => response.json())
        .then((data) => setItems(data))
        .catch((error) => console.error(error));
  }, [resource]);

  return items;
};
