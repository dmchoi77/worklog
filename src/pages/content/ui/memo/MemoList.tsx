'use client';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { Reorder } from 'motion/react';
import MemoCard from './MemoCard';
import { useFetchMemoList, useUpdateMemoOrder, memoQueryKeys } from '../../api/memo/queries';
import { Memo } from '../../model';
import useDebounce from '~/shared/hooks/useDebounce';

interface MemoListProps {
  targetDate: string;
}

export default function MemoList({ targetDate }: MemoListProps) {
  const { data: memoList = [] } = useFetchMemoList({ date: targetDate });

  const queryClient = useQueryClient();
  const { mutate } = useUpdateMemoOrder();

  const reorderCallback = useDebounce((newOrder: Memo[]) => {
    const differences = _.differenceWith(
      memoList.map((memo, index) => ({ ...memo, index })),
      newOrder.map((memo, index) => ({ ...memo, index })),
      (a, b) => a.id === b.id && a.index === b.index,
    );

    const findUpdateIndex = newOrder.findIndex((memo, index) => {
      if (memo.id === differences[0].id) return index;
    });

    mutate(
      {
        id: differences[0].id,
        order: findUpdateIndex,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({ date: targetDate }));
        },
      },
    );
  }, 200);

  return (
    <Reorder.Group values={memoList} onReorder={reorderCallback} layoutScroll className='overflow-y-auto h-full'>
      {memoList?.map((memo) => (
        <Reorder.Item key={memo.id} value={memo}>
          <MemoCard content={memo.content} id={memo.id} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
