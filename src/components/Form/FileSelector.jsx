import React from 'react';
import { styled } from 'styletron-react';
import useGetFiles from '../../hooks/useGetFiles';
import Select from './Select';

export default ({ onChange, selected }) => {
  const [files, fetchModels] = useGetFiles([]);
  const adaptedFiles = files
    .filter(
      (file) => file.status === 'processed' && file.purpuse === 'fine-tune',
    )
    .map((file) => ({
      id: file.id,
      filename: file.filename,
    }));

  return (
    <Select onChange={onChange} value={selected}>
      <optgroup label="Fine-tuned models">
        {files.map((file) => (
          <option key={file.id} value={file.id}>
            {file.filename}
          </option>
        ))}
      </optgroup>
    </Select>
  );
};
