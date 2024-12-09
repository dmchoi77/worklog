import WorkForm from '~/components/molecules/form/WorkForm';
import WorkList from '~/components/molecules/list/WorkList';
import { TodayInnerLayout } from '~/components/templates/layout/TodayInnerLayout';

import type { ICommonProps } from '~/types';

const TodayWork = ({ targetDate }: ICommonProps) => (
  <TodayInnerLayout>
    <h3 className='font-[600]'>WORK</h3>
    <WorkForm targetDate={targetDate} />
    <WorkList targetDate={targetDate} />
  </TodayInnerLayout>
);

export default TodayWork;
