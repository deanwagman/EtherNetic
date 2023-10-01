import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchModels = async () => {
  const response = await fetch('/api/fine-tune/models');
  const models = await response.json();

  return models;
};

export default () => {
  const queryClient = useQueryClient();
  const {
    data: models,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['models'],
    queryFn: fetchModels,
  });
  const invalidate = () => queryClient.invalidateQueries('models');

  return [isLoading ? [] : models, invalidate];
};
