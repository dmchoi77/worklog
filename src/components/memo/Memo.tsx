import { useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { Box, Divider } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';

import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

import useDebounce from '~/hooks/useDebounce';
import { memoQueryKeys, useDeleteMemo, useUpdateMemo } from '~/queries/memo';
import { useSnackbarStore } from '~/stores/useSnackbarStore';
import { IMemo } from '~/types/apis/memo.types';

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

const Memo = ({ content, date, id }: IMemo) => {
  const queryClient = useQueryClient();

  const [visibleBtn, setVisibleBtn] = useState(false);
  const { mutate: updateMemo } = useUpdateMemo();
  const { mutate: deleteMemo } = useDeleteMemo();

  const contentRef = useRef<HTMLElement>(null);

  const debounceUpdateMemo = useDebounce(
    (e) =>
      updateMemo(
        { content: e.target.innerHTML, id: Number(id) },
        {
          onSuccess: () => {
            updateSnackbarState({
              open: true,
              horizontal: 'center',
              message: '저장하였습니다.',
              vertical: 'bottom',
            });
            queryClient.invalidateQueries(memoQueryKeys.fetchMemos({}));
          },
          onError: (error: any) =>
            updateSnackbarState({
              open: true,
              horizontal: 'center',
              message: error.message,
              vertical: 'bottom',
            }),
        },
      ),
    300,
  );
  const { updateSnackbarState } = useSnackbarStore();

  const handleDelete = () =>
    deleteMemo(
      { id: Number(id) },
      {
        onSuccess: () => queryClient.invalidateQueries(memoQueryKeys.fetchMemos({})),
        onError: (error: any) => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: error.message,
            vertical: 'bottom',
          });
        },
      },
    );
  return (
    <Draggable draggableId={String(id)} index={id}>
      {(provided, snapshot) => (
        <Container
          key={id}
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
              <EditNoteIcon
                css={{ borderRadius: 6, background: '#ffffff' }}
                onClick={() => {
                  contentRef?.current?.focus();
                }}
              />
              <Divider css={{ width: 1, background: 'rgba(15, 15, 15, 0.1)' }} />
              <DeleteIcon css={{ borderRadius: 6, background: '#ffffff' }} onClick={handleDelete} />
            </Box>
          )}
          <Box
            contentEditable={true}
            suppressContentEditableWarning
            onInput={debounceUpdateMemo}
            onKeyDown={(e) => {
              if (e.code === 'Enter' || e.code === 'Escape') {
                const currentElement = e.target as HTMLElement;
                currentElement.blur();
              }
            }}
            ref={contentRef}
          >
            {content}
          </Box>
        </Container>
      )}
    </Draggable>
  );
};

export default Memo;
