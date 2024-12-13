import WorkForm from '~/components/molecules/form/WorkForm';
import WorkList from '~/components/molecules/list/WorkList';
import { TodayInnerLayout } from '~/components/templates/layout/TodayInnerLayout';
import { fetchWorkList } from '~/libs/work';

import type { ICommonProps } from '~/types';

const TodayWork = async ({ targetDate }: ICommonProps) => {
  const workList = await fetchWorkList(targetDate);
  return (
    <TodayInnerLayout>
      <h3 className='font-[600]'>WORK</h3>
      <WorkForm targetDate={targetDate} />
      <WorkList targetDate={targetDate} initialData={workList} />
    </TodayInnerLayout>
  );
};

export default TodayWork;
