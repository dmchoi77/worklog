import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { Checkbox } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';

import DeleteIcon from '@mui/icons-material/Delete';

import { Container } from './card.style';
import SplitButton from '../button/SplitButton';
import WorkDetail from '../detail/WorkDetail';

import { WORK_CATEGORY_OPTIONS } from '~/constants/work';
import useWork from '~/hooks/useWork';
import { useDeleteWork, useUpdateWork, workQueryKeys } from '~/queries/work';
import { useSnackbarStore } from '~/stores/useSnackbarStore';
import { IWork } from '~/types/apis/work.types';

interface IProps extends IWork {
  index: number;
}

const WorkCard = (props: IProps) => {
  const { id, title, category, state } = props;
  const { work, workSetter } = useWork(props);

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
      console.log(Object.is(props, work));
      if (Object.is(props, work)) return;

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
                  options={WORK_CATEGORY_OPTIONS}
                  onSelectOption={workSetter('category')}
                />
              </div>
              <span>{title}</span>
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
