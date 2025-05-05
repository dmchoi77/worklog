import { useMutation } from '@tanstack/react-query';
import {
  addWork,
  deleteWork,
  updateWorkCategory,
  updateWorkState,
  updateWorkContent,
  updateWorkOrder,
  updateWork,
} from '../api';
import { calendarQueryKeys } from '~/entities/calendar/model';
import { workQueryKeys } from '~/entities/work/model/queries';
import { useInvalidateQueries } from '~/shared/hooks/useInvalidateQueries';

export const useAddWork = () => {
  const invalidateQueries = useInvalidateQueries();
  return useMutation({
    mutationFn: addWork,
    onSuccess: (_, { date }) => {
      invalidateQueries([workQueryKeys.fetchWorkList({ date }).queryKey, calendarQueryKeys._def]);
    },
  });
};

export const useDeleteWork = () =>
  useMutation({
    mutationFn: deleteWork,
  });

export const useUpdateWorkCategory = () =>
  useMutation({
    mutationFn: updateWorkCategory,
  });

export const useUpdateWorkState = () =>
  useMutation({
    mutationFn: updateWorkState,
  });

export const useUpdateWorkContent = () =>
  useMutation({
    mutationFn: updateWorkContent,
  });

export const useUpdateWorkOrder = () =>
  useMutation({
    mutationFn: updateWorkOrder,
  });

export const useUpdateWork = () =>
  useMutation({
    mutationFn: updateWork,
  });

export const useWorkMutation = () => {
  const { mutateAsync: addWork } = useAddWork();
  const { mutateAsync: deleteWork } = useDeleteWork();
  const { mutateAsync: updateWorkCategory } = useUpdateWorkCategory();
  const { mutateAsync: updateWorkState } = useUpdateWorkState();
  const { mutateAsync: updateWorkContent } = useUpdateWorkContent();
  const { mutateAsync: updateWorkOrder } = useUpdateWorkOrder();
  const { mutateAsync: updateWork } = useUpdateWork();

  return {
    addWork,
    deleteWork,
    updateWorkCategory,
    updateWorkState,
    updateWorkContent,
    updateWorkOrder,
    updateWork,
  };
};
