import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { InnerLayout } from '../InnerLayout';
import MemoForm from './MemoForm';
import MemoList from './MemoList';
import { fetchMemoList } from '../../api/memo/fetch';
import { memoQueryKeys } from '../../api/memo/queries';
import { getQueryClient } from '~/app/getQueryClient';

const Memo = async ({ targetDate }: { targetDate: string }) => (
  <InnerLayout>
    <h3 className='font-[600]'>MEMO</h3>
    <MemoForm targetDate={targetDate} />
    <Memos targetDate={targetDate} />
  </InnerLayout>
);

export default Memo;

const Memos = async ({ targetDate }: { targetDate: string }) => {
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
