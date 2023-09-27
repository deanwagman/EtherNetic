import React, { useState, useEffect } from 'react';

export default () => {
  const [trainingJobs, setTrainingJobs] = useState([]);
  const fetchTrainingJobs = async () => {
    try {
      const response = await fetch('/api/training-jobs');
      const { data } = await response.json();

      setTrainingJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrainingJobs();
  }, []);

  return [trainingJobs, fetchTrainingJobs];
};
