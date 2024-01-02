import { useQueryClient } from '@tanstack/react-query';

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { List } from './CommonList';
import MemoCard from '../card/MemoCard';

import { memoQueryKeys, useFetchMemoList, useUpdateMemoOrder } from '~/queries/memo';
import { useSnackbarStore } from '~/stores/useSnackbarStore';
import { IMemo } from '~/types/apis/memo.types';

interface IProps {
  targetDate: string;
}

export default function MemoList({ targetDate }: IProps) {
  const queryClient = useQueryClient();

  const { data: memoList } = useFetchMemoList({ date: targetDate });
  const { mutate: updateMemoOrder } = useUpdateMemoOrder();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const targetMemoId = Number(draggableId);
    const desinationIndex = destination.index;
    const orderedList = [...(memoList as IMemo[])];
    const [reorderedItem] = orderedList.splice(source.index, 1);
    orderedList.splice(desinationIndex, 0, reorderedItem);

    queryClient.setQueryData(memoQueryKeys.fetchMemoList({ date: targetDate }).queryKey, orderedList);

    updateMemoOrder(
      { id: targetMemoId, order: desinationIndex },
      {
        onError: () => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: '에러가 발생했습니다.',
            vertical: 'bottom',
          });
        },

        onSettled: () => {
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
