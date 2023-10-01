import { useQuery } from '@tanstack/react-query';

export default () => {
  const {
    data: trainingMessages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['trainingMessages'],
    queryFn: async () => {
      const response = await fetch('/api/training-messages');
      const { messages } = await response.json();

      return messages;
    },
  });

  return isLoading ? [] : trainingMessages;
};
