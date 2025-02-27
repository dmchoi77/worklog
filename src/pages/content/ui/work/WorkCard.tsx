'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkDetail from './WorkDetail';
import { WorkStatusButton } from './WorkStatusButton';
import { useUpdateWork, useDeleteWork, workQueryKeys } from '../../api/work/queries';
import { Work, WorkCategoryOptions } from '../../model';
import { Container } from '../card.style';
import useWork from '~/shared/hooks/useWork';
import { useSnackbarStore } from '~/shared/stores/useSnackbarStore';

const WorkCard = (props: Work) => {
  const { id, title, category, state } = props;
  const { work, workSetter } = useWork(props);

  const searchParams = useSearchParams();
  const selectedId = searchParams?.get('selected');

  const [openWorkDetail, updateOpenWorkDetail] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useUpdateWork();
  const { mutate: deleteWork } = useDeleteWork();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const handleDeleteWork = () =>
    deleteWork(
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
        onSettled: () => queryClient.invalidateQueries(workQueryKeys.fetchWorkList({})),
      },
    );

  useEffect(
    function updateWork() {
      if (Object.entries(props).toString() === Object.entries(work).toString()) return;
      mutate(work, {
        onSuccess: (data) => {
          queryClient.invalidateQueries(workQueryKeys.fetchWorkList({}));
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: data?.message,
            vertical: 'bottom',
          });
        },
      });
    },
    [work],
  );

  useEffect(function openWorkDetailFromSearch() {
    const isTargetId = Number(selectedId) === id;
    if (selectedId && isTargetId) {
      updateOpenWorkDetail(true);
    }
  }, []);

  return (
    <>
      <Container bgColor='lightblue' onDoubleClick={() => updateOpenWorkDetail(true)}>
        <div className='flex items-center gap-x-[8px] text-ellipsis overflow-hidden'>
          <div className='m-[4px]'>
            <WorkStatusButton
              defaultOption={category}
              options={WorkCategoryOptions}
              onSelectOption={workSetter('category')}
            />
          </div>
          <div className='overflow-auto'>
            <span>{title}</span>
          </div>
        </div>
        <div className='flex items-center'>
          <Checkbox
            checked={state === 'COMPLETED' ? true : false}
            onChange={() => {
              workSetter('state')(work.state === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED');
            }}
          />
          <DeleteIcon className='rounded-[6px] bg-[#ffffff]' onClick={handleDeleteWork} />
        </div>
      </Container>
      {openWorkDetail && <WorkDetail handleClose={() => updateOpenWorkDetail(false)} {...props} />}
    </>
  );
};

export default WorkCard;
