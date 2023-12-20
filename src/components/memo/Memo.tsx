import { useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { Box, Divider } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';

import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

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

const Memo = ({ content, id, index }: IMemo & { index: number }) => {
  const queryClient = useQueryClient();
  const [input, setInput] = useState(content);

  const [visibleBtn, setVisibleBtn] = useState(false);

  const { mutate: updateMemo } = useUpdateMemo();
  const { mutate: deleteMemo } = useDeleteMemo();

  const contentRef = useRef<HTMLInputElement>(null);

  const debounceUpdateMemo = useDebounce((e) => {
    updateMemo(
      { content: e.target.value, id: Number(id) },
      {
        onSuccess: () => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: '저장하였습니다.',
            vertical: 'bottom',
          });
          queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({}));
        },
        onError: (error: any) =>
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: error.message,
            vertical: 'bottom',
          }),
      },
    );
  }, 800);
  const { updateSnackbarState } = useSnackbarStore();

  const handleDelete = () =>
    deleteMemo(
      { id: Number(id) },
      {
        onSuccess: () => queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({})),
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

  const handleOnChangeMemo = (e: ContentEditableEvent) => {
    setInput(e.target.value);
    debounceUpdateMemo(e);
  };

  return (
    <Draggable draggableId={String(index)} index={index}>
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
          <ContentEditable innerRef={contentRef} html={input} disabled={false} onChange={handleOnChangeMemo} />
        </Container>
      )}
    </Draggable>
  );
};

export default Memo;
