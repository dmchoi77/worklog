'use client';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { Reorder } from 'motion/react';
import { WorkCardEditable } from './WorkCardEditable';
import { useUpdateWorkOrder } from '../model';
import { Work } from '~/entities/work/api';
import { useFetchWorkList, workQueryKeys } from '~/entities/work/model/queries';
import useDebounce from '~/shared/hooks/useDebounce';

const REORDER_DEBOUNCE_MS = 200;
export interface WorkListProps {
  targetDate: string;
}

export const WorkList = ({ targetDate }: WorkListProps) => {
  const { data: workList = [] } = useFetchWorkList({ date: targetDate });

  const queryClient = useQueryClient();

  const { mutate } = useUpdateWorkOrder();
  const reorderCallback = useDebounce(
    useCallback(
      (newOrder: Work[]) => {
        const differences = _.differenceWith(
          workList.map((work, index) => ({ ...work, index })),
          newOrder.map((work, index) => ({ ...work, index })),
          (a, b) => a.id === b.id && a.index === b.index,
        );

        if (differences.length === 0) return;

        const findUpdateIndex = newOrder.findIndex((work) => work.id === differences[0].id);

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
      },
      [workList],
    ),
    REORDER_DEBOUNCE_MS,
  );

  const renderWorkCards = workList?.map((work) => (
    <Reorder.Item key={work?.id} value={work}>
      <WorkCardEditable work={work} />
    </Reorder.Item>
  ));

  return (
    <Reorder.Group values={workList} onReorder={reorderCallback} className='overflow-y-auto h-full'>
      {renderWorkCards}
    </Reorder.Group>
  );
};
