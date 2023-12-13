import { useMutation } from '@tanstack/react-query';

import { addMemo, deleteMemo, updateMemo } from '~/apis/memo';
import { IAddMemoRequest, IDeleteMemoRequest, IUpdateMemoRequest } from '~/types/apis/memo.types';

export const useAddMemo = () =>
  useMutation({
    mutationFn: ({ content, date }: IAddMemoRequest) => addMemo({ content, date }),
  });

export const useUpdateMemo = () =>
  useMutation({
    mutationFn: ({ content, id }: IUpdateMemoRequest) => updateMemo({ content, id }),
  });

export const useDeleteMemo = () =>
  useMutation({
    mutationFn: ({ id }: IDeleteMemoRequest) => deleteMemo({ id }),
  });
