import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '~/app/getQueryClient';
import { fetchMemoList } from '~/entities/memo/api';
import { memoQueryKeys } from '~/entities/memo/model';
import { MemoList } from '~/features/memo/ui';

export const MemoListWithData = async ({ targetDate }: { targetDate: string }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: memoQueryKeys.fetchMemoList({ date: targetDate }).queryKey,
    queryFn: () => fetchMemoList({ date: targetDate }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MemoList targetDate={targetDate} />
    </HydrationBoundary>
  );
};
