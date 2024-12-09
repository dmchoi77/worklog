import MemoForm from '~/components/molecules/form/MemoForm';
import MemoList from '~/components/molecules/list/MemoList';
import { TodayInnerLayout } from '~/components/templates/layout/TodayInnerLayout';

import type { ICommonProps } from '~/types';

const TodayMemo = ({ targetDate }: ICommonProps) => (
  <TodayInnerLayout>
    <h3 className='font-[600]'>MEMO</h3>
    <MemoForm targetDate={targetDate} />
    <MemoList targetDate={targetDate} />
  </TodayInnerLayout>
);

export default TodayMemo;
