'use client';
import { useState } from 'react';
import { Reorder } from 'motion/react';
import MemoCard from '../card/MemoCard';
import { useFetchMemoList } from '~/queries';
import type { IMemo } from '~/types';

interface IProps {
  targetDate: string;
  initialData: IMemo[];
}

export default function MemoList({ targetDate, initialData }: IProps) {
  const { data: memoList = [] } = useFetchMemoList({ date: targetDate }, initialData);
  const [item, setItem] = useState<IMemo[]>([]);

  const reorderCallback = (newOrder: IMemo[]) => {
    setItem(newOrder);
  };

  return (
    <Reorder.Group axis='y' values={item} onReorder={reorderCallback}>
      {memoList.map((memo) => (
        <Reorder.Item key={memo.id} value={memo}>
          <MemoCard content={memo.content} id={memo.id} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
