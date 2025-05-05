'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWorkMutation } from '../model';
import { WorkDetail } from './WorkDetail';
import { Work } from '~/entities/work/api';
import { workQueryKeys } from '~/entities/work/model/queries';
import { WorkCard } from '~/entities/work/ui/WorkCard';
import useWork from '~/shared/hooks/useWork';
import { useSnackbarStore } from '~/shared/stores/useSnackbarStore';

interface WorkCardEditableProps {
  work: Work;
}

export const WorkCardEditable = ({ work: initialWork }: WorkCardEditableProps) => {
  const [openWorkDetail, setOpenWorkDetail] = useState(false);

  const { work, workSetter } = useWork(initialWork);

  const { updateWork, deleteWork } = useWorkMutation();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);
  const queryClient = useQueryClient();
  const selectedId = useSearchParams()?.get('selected');

  useEffect(() => {
    if (Number(selectedId) === initialWork.id) setOpenWorkDetail(true);
  }, [initialWork.id]);

  useEffect(() => {
    if (Object.entries(initialWork).toString() === Object.entries(work).toString()) return;
    updateWork(work, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(workQueryKeys.fetchWorkList({}));
        updateSnackbarState({
          open: true,
          message: data?.message,
          horizontal: 'center',
          vertical: 'bottom',
        });
      },
    });
  }, [work]);

  const handleDelete = () =>
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

  return (
    <>
      <WorkCard
        work={work}
        onCategoryChange={workSetter('category')}
        onStateToggle={() => workSetter('state')(work.state === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED')}
        onDelete={handleDelete}
        onDoubleClick={() => setOpenWorkDetail(true)}
      />
      {openWorkDetail && <WorkDetail {...initialWork} handleClose={() => setOpenWorkDetail(false)} />}
    </>
  );
};
