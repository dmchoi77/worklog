import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { List } from './CommonList';
import Memo from '../memo/Memo';

interface IMemoListProps {
  column: { id: string; title: string; taskIds: string[] };
  tasks: {
    id: string;
    content: string;
  }[];
}

export default function MemoList({ column, tasks }: IMemoListProps) {
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
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks?.map((task, idx) => (
                <Memo key={task.id} task={task} index={idx} />
              ))}
              {provided.placeholder}
            </List>
          );
        }}
      </Droppable>
  );
}
