import { useQuery } from '@tanstack/react-query';

export default () => {
  const {
    data: prompts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      const response = await fetch('/api/prompts');
      const data = await response.json();

      return data;
    },
  });

  return isLoading ? [] : prompts;
};
