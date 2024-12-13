import { Suspense } from 'react';
import { Spinner } from '@radix-ui/themes';
import MemoForm from '~/components/molecules/form/MemoForm';
import MemoList from '~/components/molecules/list/MemoList';
import { TodayInnerLayout } from '~/components/templates/layout/TodayInnerLayout';
import { fetchMemoList } from '~/libs/memo';
import type { ICommonProps } from '~/types';

const TodayMemo = async ({ targetDate }: ICommonProps) => (
  <TodayInnerLayout>
    <h3 className='font-[600]'>MEMO</h3>
    <MemoForm targetDate={targetDate} />
    <Suspense fallback={<Spinner size='3' className='mx-auto' />}>
      <Memos targetDate={targetDate} />
    </Suspense>
  </TodayInnerLayout>
);

export default TodayMemo;

const Memos = async ({ targetDate }: { targetDate: string }) => {
  const memoList = await fetchMemoList(targetDate);

  return <MemoList targetDate={targetDate} initialData={memoList} />;
};
