import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Reorder } from 'motion/react';
import MemoCard from '../card/MemoCard';

import { useSnackbarStore } from '~/stores/useSnackbarStore';

import { memoQueryKeys, useFetchMemoList, useUpdateMemoOrder } from '~/queries';
import type { IMemo } from '~/types';

interface IProps {
  targetDate: string;
}

export default function MemoList({ targetDate }: IProps) {
  // const queryClient = useQueryClient();

  const { data: memoList = [] } = useFetchMemoList({ date: targetDate });
  const [item, setItem] = useState<IMemo[]>([]);

  // const { mutate: updateMemoOrder } = useUpdateMemoOrder();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const reorderCallback = (newOrder: IMemo[]) => {
    setItem(newOrder);
  };

  useEffect(() => {
    setItem(memoList);
  }, [memoList]);

  return (
    <Reorder.Group axis='y' values={item} onReorder={reorderCallback}>
      {item.map((memo) => (
        <Reorder.Item key={memo.id} value={memo}>
          <MemoCard content={memo.content} id={memo.id} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
