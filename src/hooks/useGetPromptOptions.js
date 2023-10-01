import { useQuery } from '@tanstack/react-query';

const fetchOptions = async () => {
  const response = await fetch('/api/prompts/options');
  const data = await response.json();

  return data;
};

export default () => {
  const {
    data: promptOptions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['promptOptions'],
    queryFn: fetchOptions,
  });

  return isLoading ? [] : promptOptions;
};
