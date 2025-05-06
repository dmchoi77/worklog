'use client';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWorkMutation } from '../model';
import { WorkDetail } from './WorkDetail';
import { Work, WorkCategory } from '~/entities/work/api';
import { workQueryKeys } from '~/entities/work/model/queries';
import { WorkCard } from '~/entities/work/ui/WorkCard';
import { useSnackbarStore } from '~/shared/stores/useSnackbarStore';

interface WorkCardEditableProps {
  work: Work;
}

export const WorkCardEditable = ({ work: initialWork }: WorkCardEditableProps) => {
  const [openWorkDetail, setOpenWorkDetail] = useState(false);

  const { updateWork, deleteWork } = useWorkMutation();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);
  const queryClient = useQueryClient();

  const onDelete = () =>
    deleteWork(
      { id: initialWork.id },
      {
        onSuccess: (data) =>
          updateSnackbarState({ open: true, message: data.message, horizontal: 'center', vertical: 'bottom' }),
        onError: (error: any) =>
          updateSnackbarState({ open: true, message: error.message, horizontal: 'center', vertical: 'bottom' }),
        onSettled: () => queryClient.invalidateQueries(workQueryKeys.fetchWorkList({})),
      },
    );

  const onChangeCategory = (value: WorkCategory) => {
    updateWork(
      {
        ...initialWork,
        category: value,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(workQueryKeys.fetchWorkList({}));
          updateSnackbarState({
            open: true,
            message: data?.message,
            horizontal: 'center',
            vertical: 'bottom',
          });
        },
      },
    );
  };

  const onChangeState = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const value = checked ? 'COMPLETED' : 'IN_PROGRESS';
    updateWork(
      {
        ...initialWork,
        state: value,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(workQueryKeys.fetchWorkList({}));
          updateSnackbarState({
            open: true,
            message: data?.message,
            horizontal: 'center',
            vertical: 'bottom',
          });
        },
      },
    );
  };
  return (
    <>
      <WorkCard
        work={initialWork}
        onChangeCategory={onChangeCategory}
        onChangeState={onChangeState}
        onDelete={onDelete}
        onDoubleClick={() => setOpenWorkDetail(true)}
      />
      {openWorkDetail && <WorkDetail {...initialWork} handleClose={() => setOpenWorkDetail(false)} />}
    </>
  );
};
