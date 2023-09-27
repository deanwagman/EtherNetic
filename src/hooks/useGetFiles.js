import { useEffect, useState } from 'react';

export default () => {
  const [files, setFiles] = useState([]);
  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/training-messages/files');
      const files = await response.json();

      setFiles(files);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return [files, fetchFiles];
};
