import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ContentEditableEvent } from 'react-contenteditable';
import { useMemoMutations } from './queries';
import { memoQueryKeys } from '~/entities/memo/model';
import useDebounce from '~/shared/hooks/useDebounce';
import { useSnackbarStore } from '~/shared/stores/useSnackbarStore';

export const useMemoCardDetail = ({ content, id }: { content: string; id: number }) => {
  const queryClient = useQueryClient();
  const inputRef = useRef(content);
  const contentRef = useRef<HTMLInputElement>(null);
  const [visibleBtn, setVisibleBtn] = useState(false);

  const { updateMemo, deleteMemo } = useMemoMutations();
  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const debounceUpdateMemo = useDebounce(async (e: ContentEditableEvent) => {
    await updateMemo(
      { content: e.target.value, id: Number(id) },
      {
        onSuccess: () =>
          updateSnackbarState({ open: true, horizontal: 'center', message: '저장하였습니다.', vertical: 'bottom' }),
        onError: (error: any) => {
          updateSnackbarState({ open: true, horizontal: 'center', message: error.message, vertical: 'bottom' });
          contentRef?.current?.blur();
          inputRef.current = content;
        },
        onSettled: () => queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({})),
      },
    );
  }, 800);

  const handleDeleteMemo = async () => {
    await deleteMemo(
      { id },
      {
        onSuccess: (data) =>
          updateSnackbarState({ open: true, horizontal: 'center', message: data.message, vertical: 'bottom' }),
        onError: (error: any) =>
          updateSnackbarState({ open: true, horizontal: 'center', message: error.message, vertical: 'bottom' }),
        onSettled: () => queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({})),
      },
    );
  };

  const handleOnChangeMemo = (e: ContentEditableEvent) => {
    debounceUpdateMemo(e);
    inputRef.current = e.target.value;
  };

  const handleFocusContent = () => {
    contentRef?.current?.focus();
  };

  return {
    visibleBtn,
    setVisibleBtn,
    contentRef,
    handleOnChangeMemo,
    handleDeleteMemo,
    handleFocusContent,
  };
};
