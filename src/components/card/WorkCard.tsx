import { useRef, useState } from 'react';

import { Checkbox } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';

import ContentEditable from 'react-contenteditable';

import { Container } from './card.style';
import SplitButton from '../button/SplitButton';
import WorkDetail from '../detail/WorkDetail';

import { IWork } from '~/apis/work';
import { WorkCategoryType } from '~/types/apis/work.types';

const WorkCard = (props: IWork) => {
  const { content, id, category: defaultCategory } = props;
  const [input, setInput] = useState(content);

  const [category, updateCategory] = useState<WorkCategoryType>(defaultCategory);
  const contentRef = useRef<HTMLInputElement>(null);

  const [openWork, updateOpenWork] = useState(false);
  return (
    <>
      <Draggable draggableId={String(id)} index={id}>
        {(provided, snapshot) => (
          <Container
            bgColor='lightblue'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onDoubleClick={(e) => updateOpenWork(true)}
          >
            <div css={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div css={{ margin: 4 }}>
                <SplitButton
                  defaultOption={category}
                  options={['update', 'refactor', 'chore', 'feat']}
                  selectedOption={updateCategory}
                />
              </div>
              <ContentEditable
                innerRef={contentRef}
                html={input}
                disabled={false}
                onChange={() => {}}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    contentRef?.current?.blur();
                  }
                }}
              />
            </div>
            <Checkbox defaultChecked />
          </Container>
        )}
      </Draggable>
      {openWork && <WorkDetail handleClose={() => updateOpenWork(false)} {...props} />}{' '}
    </>
  );
};

export default WorkCard;
