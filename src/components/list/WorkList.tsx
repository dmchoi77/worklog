import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { List } from './CommonList';
import WorkCard from '../card/WorkCard';

import { useFetchWorkList } from '~/queries/work';

interface IProps {
  targetDate: string;
}

export default function WorkList({ targetDate }: IProps) {
  const { data: workList } = useFetchWorkList({ date: targetDate });

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId='work-list'>
        {(provided, snapshot) => {
          return (
            <List {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
              {workList?.map((work) => <WorkCard key={work.id} {...work} />)}
              {provided.placeholder}
            </List>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}
