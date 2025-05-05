import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '~/app/getQueryClient';
import { fetchWorkList } from '~/entities/work/api';
import { workQueryKeys } from '~/entities/work/model/queries';
import { WorkList } from '~/features/work/ui';

export const WorkListWithData = async ({ targetDate }: { targetDate: string }) => {
  const queryClient = getQueryClient();

  const queryKey = workQueryKeys.fetchWorkList({ date: targetDate }).queryKey;

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchWorkList({ date: targetDate }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <WorkList targetDate={targetDate} />
    </HydrationBoundary>
  );
};
