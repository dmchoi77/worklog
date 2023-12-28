import { useState } from 'react';

import { Checkbox } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';

import styled from '@emotion/styled';

import SplitButton from '../button/SplitButton';

import { IWork } from '~/apis/work';
import { WorkCategoryType } from '~/types/apis/work.types';

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
  background-color: ${(props) => (props.isDragging ? 'lightblue' : '#ffffff')};
  box-shadow:
    0px 2px 7px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const WorkCard = ({ content, id, category: defaultCategory }: IWork) => {
  const [category, updateCategory] = useState<WorkCategoryType>(defaultCategory);

  return (
    <Draggable draggableId={String(id)} index={id}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div>
            <SplitButton
              defaultOption={category}
              options={['update', 'refactor', 'chore', 'feat']}
              selectedOption={updateCategory}
            />
            <span css={{ fontSize: 13, padding: 10 }}>{content}</span>
          </div>
          <Checkbox defaultChecked />
        </Container>
      )}
    </Draggable>
  );
};

export default WorkCard;
