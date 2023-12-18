import { useEffect, useState } from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { List } from './CommonList';
import Memo from '../memo/Memo';

import { useFetchMemos } from '~/queries/memo';

export default function MemoList() {
  const { data: memoList } = useFetchMemos({});

  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {memoList?.map((memo) => (
        <Droppable droppableId={'memo'} key={memo.id}>
          {(provided, snapshot) => (
            <List
              // {...provided.droppableProps} ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <Memo key={memo.id} content={memo.content} id={memo.id} date={memo.date} />
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}
