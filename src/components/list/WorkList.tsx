import { useQueryClient } from '@tanstack/react-query';

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { List } from './CommonList';
import WorkCard from '../card/WorkCard';

import { useFetchWorkList, useUpdateWorkOrder, workQueryKeys } from '~/queries/work';
import { useSnackbarStore } from '~/stores/useSnackbarStore';
import { IWork } from '~/types/apis/work.types';

interface IProps {
  targetDate: string;
}

export default function WorkList({ targetDate }: IProps) {
  const queryClient = useQueryClient();

  const { data: workList } = useFetchWorkList({ date: targetDate });

  const { mutate: updateWorkOrder } = useUpdateWorkOrder();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const targetId = Number(draggableId);
    const desinationIndex = destination.index;
    const orderedList = [...(workList as IWork[])];
    const [reorderedItem] = orderedList.splice(source.index, 1);
    orderedList.splice(desinationIndex, 0, reorderedItem);

    queryClient.setQueryData(workQueryKeys.fetchWorkList({ date: targetDate }).queryKey, orderedList);

    updateWorkOrder(
      {
        id: targetId,
        order: desinationIndex,
      },
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
          queryClient.invalidateQueries(workQueryKeys.fetchWorkList({ date: targetDate }));
        },
      },
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='work-list'>
        {(provided, snapshot) => {
          return (
            <List {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
              {workList?.map((work, index) => <WorkCard key={work?.id} {...work} index={index} />)}
              {provided.placeholder}
            </List>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}
