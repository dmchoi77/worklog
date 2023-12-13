import { useEffect, useState } from 'react';

import { Droppable } from 'react-beautiful-dnd';

import styled from '@emotion/styled';

import { List } from './CommonList';
import Work from '../work/Work';

interface IWorkListProps {
  column: { id: string; title: string; taskIds: string[] };
  tasks: {
    id: string;
    content: string;
  }[];
}
export default function WorkList({ column, tasks }: IWorkListProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  return (
    <Droppable droppableId={column?.id}>
      {(provided, snapshot) => {
        return (
          <List {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
            {tasks?.map((task, idx) => <Work key={task.id} task={task} index={idx} />)}
            {provided.placeholder}
          </List>
        );
      }}
    </Droppable>
  );
}
