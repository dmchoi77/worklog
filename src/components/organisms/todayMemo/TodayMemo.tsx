import MemoForm from '~/components/molecules/form/MemoForm';
import MemoList from '~/components/molecules/list/MemoList';
import { TodayInnerLayout } from '~/components/templates/layout/TodayInnerLayout';
import { fetchMemoList } from '~/libs/memo';
import type { ICommonProps } from '~/types';

const TodayMemo = async ({ targetDate }: ICommonProps) => {
  const memoList = await fetchMemoList(targetDate);
  return (
    <TodayInnerLayout>
      <h3 className='font-[600]'>MEMO</h3>
      <MemoForm targetDate={targetDate} />
      <MemoList targetDate={targetDate} initialData={memoList} />
    </TodayInnerLayout>
  );
};

export default TodayMemo;
