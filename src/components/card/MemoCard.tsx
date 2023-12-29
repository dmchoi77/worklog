import { useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { Box, Divider } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';

import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import { Container } from './card.style';

import useDebounce from '~/hooks/useDebounce';
import { memoQueryKeys, useDeleteMemo, useUpdateMemo } from '~/queries/memo';
import { useSnackbarStore } from '~/stores/useSnackbarStore';

interface IProps {
  content: string;
  id: number;
  index: number;
}

const MemoCard = ({ content, id, index }: IProps) => {
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
        },
        onError: (error: any) => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: error.message,
            vertical: 'bottom',
          });
          contentRef?.current?.blur();
          setInput(content);
        },
        onSettled: () => {
          queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({}));
        },
      },
    );
  }, 800);
  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const handleDelete = () =>
    deleteMemo(
      { id: Number(id) },
      {
        onSuccess: (data) => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: data?.message,
            vertical: 'bottom',
          });
        },
        onError: (error: any) => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: error.message,
            vertical: 'bottom',
          });
        },
        onSettled: () => queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({})),
      },
    );

  const handleOnChangeMemo = (e: ContentEditableEvent) => {
    debounceUpdateMemo(e);
    setInput(e.target.value);
  };

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided, snapshot) => (
        <Container
          bgColor='lightgreen'
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
          <ContentEditable
            innerRef={contentRef}
            html={input}
            disabled={false}
            onChange={handleOnChangeMemo}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                contentRef?.current?.blur();
              }
            }}
          />
        </Container>
      )}
    </Draggable>
  );
};

export default MemoCard;
