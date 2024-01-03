import { useRef, useState } from 'react';

import { Checkbox } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';

import ContentEditable from 'react-contenteditable';

import { Container } from './card.style';
import SplitButton from '../button/SplitButton';
import WorkDetail from '../detail/WorkDetail';

import { IWork, WorkCategoryType } from '~/types/apis/work.types';

const WorkCard = (props: IWork) => {
  const { content, id, category: defaultCategory, state } = props;
  const [input, setInput] = useState(content);

  const [work, setWork] = useState<IWork>(() => props);

  // const updateCategory = () => {};
  const [category, updateCategory] = useState<WorkCategoryType>(defaultCategory);

  const [openWork, updateOpenWork] = useState(false);

  const contentRef = useRef<HTMLInputElement>(null);

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
            onDoubleClick={() => updateOpenWork(true)}
          >
            <div css={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div css={{ margin: 4 }}>
                <SplitButton
                  defaultOption={category}
                  options={['update', 'refactor', 'chore', 'feat']}
                  onSelectOption={updateCategory}
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
            <Checkbox
              name='state'
              checked={work.state.toLocaleLowerCase() === 'completed' ? true : false}
              onChange={() => {
                setWork((prev) => ({
                  ...prev,
                  state: prev.state ? 'in_progress' : 'completed',
                }));
              }}
            />
          </Container>
        )}
      </Draggable>
      {openWork && <WorkDetail handleClose={() => updateOpenWork(false)} {...props} />}
    </>
  );
};

export default WorkCard;
