import { Suspense } from 'react';
import { Spinner } from '@radix-ui/themes';
import WorkForm from './WorkForm';
import WorkList from './WorkList';
import { fetchWorkListWithRSC } from '../../api/work/fetch';
import { InnerLayout } from '../InnerLayout';

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
  const workList = await fetchWorkListWithRSC(targetDate);

  return <WorkList targetDate={targetDate} initialData={workList} />;
};
