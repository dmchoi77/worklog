import { Suspense } from 'react';
import { Spinner } from '@radix-ui/themes';
import { InnerLayout } from '../InnerLayout';
import MemoForm from './MemoForm';
import MemoList from './MemoList';
import { fetchMemoListWithRSC } from '../../api/memo/fetch';

const Memo = async ({ targetDate }: { targetDate: string }) => (
  <InnerLayout>
    <h3 className='font-[600]'>MEMO</h3>
    <MemoForm targetDate={targetDate} />
    <Suspense fallback={<Spinner size='3' className='mx-auto' />}>
      <Memos targetDate={targetDate} />
    </Suspense>
  </InnerLayout>
);

export default Memo;

const Memos = async ({ targetDate }: { targetDate: string }) => {
  const memoList = await fetchMemoListWithRSC(targetDate);

  return <MemoList targetDate={targetDate} initialData={memoList} />;
};
