import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { Checkbox } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';

import DeleteIcon from '@mui/icons-material/Delete';

import { Container } from './card.style';
import SplitButton from '../button/SplitButton';
import WorkDetail from '../detail/WorkDetail';

import useWork from '~/hooks/useWork';
import { useSnackbarStore } from '~/stores/useSnackbarStore';

import { WorkCategoryOptions } from '~/constants';
import { useDeleteWork, useUpdateWork, workQueryKeys } from '~/queries';
import type { IWork } from '~/types';

interface IProps extends IWork {
  index: number;
}

const WorkCard = (props: IProps) => {
  const { id, title, category, state } = props;
  const { work, workSetter } = useWork(props);

  const searchParams = useSearchParams();
  const selectedId = searchParams.get('selected');

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
      <Draggable draggableId={String(id)} index={props.index}>
        {(provided, snapshot) => (
          <Container
            bgColor='lightblue'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onDoubleClick={() => updateOpenWorkDetail(true)}
          >
            <div css={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div css={{ margin: 4 }}>
                <SplitButton
                  defaultOption={category}
                  options={WorkCategoryOptions}
                  onSelectOption={workSetter('category')}
                />
              </div>
              <span style={{ overflowWrap: 'anywhere' }}>{title}</span>
            </div>
            <div css={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={state === 'COMPLETED' ? true : false}
                onChange={() => {
                  workSetter('state')(work.state === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED');
                }}
              />
              <DeleteIcon css={{ borderRadius: 6, background: '#ffffff' }} onClick={handleDeleteWork} />
            </div>
          </Container>
        )}
      </Draggable>
      {openWorkDetail && <WorkDetail handleClose={() => updateOpenWorkDetail(false)} {...props} />}
    </>
  );
};

export default WorkCard;
