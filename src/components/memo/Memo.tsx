import { useState } from 'react';

import { Box, Divider } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';

import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

import useDebounce from '~/hooks/useDebounce';
import { useDeleteMemo, useUpdateMemo } from '~/queries/memo';

interface IContainer {
  isDragging: boolean;
}

const Container = styled.div<IContainer>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  height: auto;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : '#ffffff')};
  box-shadow:
    0px 2px 7px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
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
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [editable, setEditable] = useState(false);
  const { mutate: updateMemo } = useUpdateMemo();
  const { mutate: deleteMemo } = useDeleteMemo();

  const debounceUpdateMemo = useDebounce((e) => updateMemo({ content: e.target.innerHTML, id: Number(task.id) }), 300);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          key={task.id}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onMouseOver={() => setVisibleBtn(true)}
          onMouseOut={() => setVisibleBtn(false)}
        >
          {visibleBtn && (
            <Box
              css={{
                display: 'flex',
                position: 'absolute',
                marginRight: 8,
                right: 0,
                borderRadius: 4,
                boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px',
              }}
            >
              {/* <EditNoteIcon
                css={{ borderRadius: 6, background: '#ffffff' }}
                onClick={() => setEditable(true)}
                onBlur={() => setEditable(false)}
              /> */}
              <Divider css={{ width: 1, background: 'rgba(15, 15, 15, 0.1)' }} />
              <DeleteIcon
                css={{ borderRadius: 6, background: '#ffffff' }}
                onClick={() => deleteMemo({ id: Number(task.id) })}
              />
            </Box>
          )}
          <Box
            contentEditable={editable}
            suppressContentEditableWarning
            onClick={() => setEditable(true)}
            onBlur={() => setEditable(false)}
            onInput={debounceUpdateMemo}
            onKeyDown={(e) => {
              if (e.code === 'Enter') setEditable(false);
            }}
          >
            {task.content}
          </Box>
        </Container>
      )}
    </Draggable>
  );
};

export default Memo;
