import { Draggable } from 'react-beautiful-dnd';
import SplitButton from '../button/SplitButton';
import { Checkbox } from '@mui/material';
import styled from '@emotion/styled';

interface IContainer {
  isDragging: boolean;
}

const Container = styled.div<IContainer>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : '#ffffff')};
`;

interface IWorkProps {
  task: {
    id: string;
    content: string;
  };
  index: number;
}

const Work = ({ index, task }: IWorkProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div>
            <SplitButton />
            <span css={{ fontSize: 13, padding: 10 }}>{task.content}</span>
          </div>
          <Checkbox defaultChecked />
        </Container>
      )}
    </Draggable>
  );
};

export default Work;
