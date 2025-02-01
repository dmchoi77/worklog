'use client';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { Reorder } from 'motion/react';
import WorkCard from './WorkCard';
import { useFetchWorkList, useUpdateWorkOrder, workQueryKeys } from '../../api/work/queries';
import { Work } from '../../model';
import useDebounce from '~/shared/hooks/useDebounce';

interface WorkListProps {
  targetDate: string;
  initialData: Work[];
}

export default function WorkList({ targetDate, initialData }: WorkListProps) {
  const { data: workList = [] } = useFetchWorkList({ date: targetDate }, initialData);

  const queryClient = useQueryClient();
  const { mutate } = useUpdateWorkOrder();

  const reorderCallback = useDebounce((newOrder: Work[]) => {
    const differences = _.differenceWith(
      workList.map((work, index) => ({ ...work, index })),
      newOrder.map((work, index) => ({ ...work, index })),
      (a, b) => a.id === b.id && a.index === b.index,
    );

    const findUpdateIndex = newOrder.findIndex((work, index) => {
      if (work.id === differences[0].id) return index;
    });

    mutate(
      {
        id: differences[0].id,
        order: findUpdateIndex,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(workQueryKeys.fetchWorkList({ date: targetDate }));
        },
      },
    );
  }, 200);

  return (
    <Reorder.Group values={workList} onReorder={reorderCallback} className='overflow-y-auto h-full'>
      {workList.map((work) => (
        <Reorder.Item key={work?.id} value={work}>
          <WorkCard key={work?.id} {...work} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
