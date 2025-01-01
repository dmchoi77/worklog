import { type QueryKey, useQueryClient } from '@tanstack/react-query';

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return (queryKeys: QueryKey) =>
    queryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });
};
