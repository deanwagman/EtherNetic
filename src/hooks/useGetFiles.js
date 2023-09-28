import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchFiles = async () => {
  try {
    const response = await fetch('/api/training-messages/files');
    const files = await response.json();

    return files;
  } catch (error) {
    console.error(error);
  }
};

export default () => {
  const queryClient = useQueryClient();
  const { data: files, isLoading, error } = useQuery(['files'], fetchFiles);
  const invalidateFiles = () => queryClient.invalidateQueries('files');

  return [files || [], invalidateFiles];
};
