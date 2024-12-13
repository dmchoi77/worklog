import { Suspense } from 'react';
import { Spinner } from '@radix-ui/themes';
import WorkForm from '~/components/molecules/form/WorkForm';
import WorkList from '~/components/molecules/list/WorkList';
import { TodayInnerLayout } from '~/components/templates/layout/TodayInnerLayout';
import { fetchWorkList } from '~/libs/work';

import type { ICommonProps } from '~/types';

const TodayWork = async ({ targetDate }: ICommonProps) => (
  <TodayInnerLayout>
    <h3 className='font-[600]'>WORK</h3>
    <WorkForm targetDate={targetDate} />
    <Suspense fallback={<Spinner size='3' className='mx-auto' />}>
      <Works targetDate={targetDate} />
    </Suspense>
  </TodayInnerLayout>
);

export default TodayWork;

const Works = async ({ targetDate }: { targetDate: string }) => {
  const workList = await fetchWorkList(targetDate);

  return <WorkList targetDate={targetDate} initialData={workList} />;
};
