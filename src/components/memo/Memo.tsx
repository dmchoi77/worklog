import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

interface IContainer {
  isDragging: boolean;
}

const Container = styled.div<IContainer>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  height: auto;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : '#ffffff')};
  box-shadow: 0px 2px 7px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

interface IMemoProps {
  task: {
    id: string;
    content: string;
  };
  index: number;
}

const Memo = ({ index, task }: IMemoProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <span css={{ fontSize: 15, fontWeight: 700 }}>{task.id}</span>
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Memo;
