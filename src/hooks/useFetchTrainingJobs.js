import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default () => {
  const fetchTrainingJobs = async () => {
    try {
      const response = await fetch('/api/training-jobs');
      const { data } = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const queryClient = useQueryClient();
  const {
    data: trainingJobs,
    isLoading,
    error,
  } = useQuery(['training-jobs'], fetchTrainingJobs);

  const invalidateTrainingJobs = () =>
    queryClient.invalidateQueries('training-jobs');

  return [trainingJobs || [], invalidateTrainingJobs];
};
