import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Spinner } from '@radix-ui/themes';
import WorkForm from './WorkForm';
import WorkList from './WorkList';
import { fetchWorkList } from '../../api/work/fetch';
import { workQueryKeys } from '../../api/work/queries';
import { InnerLayout } from '../InnerLayout';
import { getQueryClient } from '~/app/getQueryClient';

const Work = async ({ targetDate }: { targetDate: string }) => (
  <InnerLayout>
    <h3 className='font-[600]'>WORK</h3>
    <WorkForm targetDate={targetDate} />
    <Suspense fallback={<Spinner size='3' className='mx-auto' />}>
      <Works targetDate={targetDate} />
    </Suspense>
  </InnerLayout>
);

export default Work;

const Works = async ({ targetDate }: { targetDate: string }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: workQueryKeys.fetchWorkList({ date: targetDate }).queryKey,
    queryFn: () => fetchWorkList({ date: targetDate }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <WorkList targetDate={targetDate} />
    </HydrationBoundary>
  );
};
