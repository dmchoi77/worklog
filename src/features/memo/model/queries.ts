import { useMutation } from '@tanstack/react-query';
import { addMemo, updateMemo, updateMemoOrder, deleteMemo } from '../api/fetch';
import { calendarQueryKeys } from '~/entities/calendar/model';
import { memoQueryKeys } from '~/entities/memo/model';
import { useInvalidateQueries } from '~/shared/hooks/useInvalidateQueries';

export const useAddMemo = () => {
  const invalidateQueries = useInvalidateQueries();
  return useMutation({
    mutationFn: addMemo,
    onSuccess: (_, { date }) => {
      invalidateQueries([calendarQueryKeys._def, memoQueryKeys.fetchMemoList({ date }).queryKey]);
    },
  });
};

export const useUpdateMemo = () =>
  useMutation({
    mutationFn: updateMemo,
  });

export const useUpdateMemoOrder = () =>
  useMutation({
    mutationFn: updateMemoOrder,
  });

export const useDeleteMemo = () =>
  useMutation({
    mutationFn: deleteMemo,
  });

export const useMemoMutations = () => {
  const { mutateAsync: addMemo } = useAddMemo();
  const { mutateAsync: updateMemo } = useUpdateMemo();
  const { mutateAsync: updateMemoOrder } = useUpdateMemoOrder();
  const { mutateAsync: deleteMemo } = useDeleteMemo();

  return {
    addMemo,
    updateMemo,
    updateMemoOrder,
    deleteMemo,
  };
};
