import { useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { List } from './CommonList';
import MemoCard from '../card/MemoCard';

import { memoQueryKeys, useFetchMemoList, useUpdateMemoOrder } from '~/queries/memo';
import { IMemo } from '~/types/apis/memo.types';

interface IProps {
  targetDate: string;
}

export default function MemoList({ targetDate }: IProps) {
  const queryClient = useQueryClient();

  const { data: memoList } = useFetchMemoList({ startDate: targetDate, endDate: targetDate });
  const { mutateAsync: updateMemoOrder } = useUpdateMemoOrder();

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const targetMemoId = Number(draggableId);
    const desinationIndex = destination.index;
    await updateMemoOrder(
      { id: targetMemoId, order: desinationIndex },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({}));
        },
      },
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'memo-list'}>
        {(provided, snapshot) => {
          return (
            <List {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
              {memoList?.map((memo, index) => (
                <MemoCard key={memo.id} content={memo.content} id={memo.id} index={index} />
              ))}
              {provided.placeholder}
            </List>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}
