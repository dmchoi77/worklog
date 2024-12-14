'use client';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { Reorder } from 'motion/react';
import MemoCard from '../card/MemoCard';
import useDebounce from '~/hooks/useDebounce';
import { memoQueryKeys, useFetchMemoList, useUpdateMemoOrder } from '~/queries';
import type { IMemo } from '~/types';

interface IProps {
  targetDate: string;
  initialData: IMemo[];
}

export default function MemoList({ targetDate, initialData }: IProps) {
  const { data: memoList = [] } = useFetchMemoList({ date: targetDate }, initialData);

  const queryClient = useQueryClient();
  const { mutate } = useUpdateMemoOrder();

  const reorderCallback = useDebounce((newOrder: IMemo[]) => {
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
    <Reorder.Group values={memoList} onReorder={reorderCallback} layoutScroll className='h-full'>
      {memoList.map((memo) => (
        <Reorder.Item key={memo.id} value={memo}>
          <MemoCard content={memo.content} id={memo.id} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
