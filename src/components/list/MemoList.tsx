import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { List } from './CommonList';
import MemoCard from '../card/MemoCard';

import { useFetchMemoList } from '~/queries/memo';

interface IProps {
  targetDate: string;
}

export default function MemoList({ targetDate }: IProps) {
  const { data: memoList } = useFetchMemoList({ startDate: targetDate, endDate: targetDate });

  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'memo-list'}>
        {(provided, snapshot) => {
          return (
            <List {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
              {memoList?.map((memo, index) => (
                <MemoCard key={memo.id} content={memo.content} id={memo.id} date={memo.date} index={index} />
              ))}
              {provided.placeholder}
            </List>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}
