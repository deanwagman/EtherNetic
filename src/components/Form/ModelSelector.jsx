import React from 'react';
import { styled } from 'styletron-react';
import useFetchModels from '../../hooks/useFetchModels';
import useFetchTrainingJobs from '../../hooks/useFetchTrainingJobs';
import Select from './Select';

export default ({ onChange, selected }) => {
  const [models, fetchModels] = useFetchModels(selected);
  const [trainingJobs, fetchTrainingJobs] = useFetchTrainingJobs();
  const fineTuneModels = trainingJobs.map((job) => ({
    id: job.fine_tuned_model,
  }));

  return (
    <Select onChange={onChange} value={selected}>
      <optgroup label="Fine-tuned models">
        {fineTuneModels.map((model) => (
          <option key={model.id} value={model.id}>
            {model.id}
          </option>
        ))}
      </optgroup>

      <optgroup label="Base models">
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.id}
          </option>
        ))}
      </optgroup>
    </Select>
  );
};
