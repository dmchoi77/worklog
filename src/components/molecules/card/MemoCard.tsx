'use client';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { Container } from './card.style';
import useDebounce from '~/hooks/useDebounce';
import { useSnackbarStore } from '~/stores/useSnackbarStore';
import { memoQueryKeys, useDeleteMemo, useUpdateMemo } from '~/queries';

interface IProps {
  content: string;
  id: number;
}

const MemoCard = ({ content, id }: IProps) => {
  const queryClient = useQueryClient();

  const inputRef = useRef(content);
  const contentRef = useRef<HTMLInputElement>(null);

  const [visibleBtn, setVisibleBtn] = useState(false);

  const { mutate: updateMemo } = useUpdateMemo();
  const { mutate: deleteMemo } = useDeleteMemo();

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
          inputRef.current = content;
        },
        onSettled: () => {
          queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({}));
        },
      },
    );
  }, 800);
  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const handleDeleteMemo = () =>
    deleteMemo(
      { id: id },
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
    inputRef.current = e.target.value;
  };

  return (
    <Container
      bgColor='lightgreen'
      key={id}
      onMouseOver={() => setVisibleBtn(true)}
      onMouseOut={() => setVisibleBtn(false)}
    >
      {visibleBtn && (
        <Box className='flex absolute mr-3 right-0 rounded-md shadow-md'>
          <EditNoteIcon
            className='rounded-md bg-white'
            onClick={() => {
              contentRef?.current?.focus();
            }}
          />
          <Divider className='w-1 bg-gray-300' />
          <DeleteIcon className='rounded-md bg-white' onClick={handleDeleteMemo} />
        </Box>
      )}
      <ContentEditable
        tagName='span'
        className='whitespace-break-spaces break-all'
        innerRef={contentRef}
        html={inputRef.current}
        disabled={false}
        onChange={handleOnChangeMemo}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            contentRef?.current?.blur();
          }
        }}
      />
    </Container>
  );
};

export default MemoCard;
