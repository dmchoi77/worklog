import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { Checkbox } from '@mui/material';

import { Draggable } from 'react-beautiful-dnd';

import { Container } from './card.style';
import SplitButton from '../button/SplitButton';
import WorkDetail from '../detail/WorkDetail';

import { useUpdateWork, workQueryKeys } from '~/queries/work';
import { useSnackbarStore } from '~/stores/useSnackbarStore';
import { IWork, WorkCategoryType } from '~/types/apis/work.types';

const WorkCard = (props: IWork) => {
  const { id, title, category, state } = props;
  const [work, setWork] = useState<IWork>(() => props);
  const [openWorkDetail, updateOpenWorkDetail] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useUpdateWork();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const updateCategory = (value: WorkCategoryType) => {
    setWork((prev) => ({
      ...prev,
      category: value,
    }));
  };

  useEffect(
    function updateWork() {
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
      <Draggable draggableId={String(id)} index={id}>
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
                  options={['update', 'refactor', 'chore', 'feat']}
                  onSelectOption={updateCategory}
                />
              </div>
              <span>{title}</span>
            </div>
            <Checkbox
              name='state'
              checked={state.toLocaleLowerCase() === 'completed' ? true : false}
              onChange={() => {
                setWork((prev) => ({
                  ...prev,
                  state: prev.state.toLocaleLowerCase() === 'completed' ? 'in_progress' : 'completed',
                }));
              }}
            />
          </Container>
        )}
      </Draggable>
      {openWorkDetail && <WorkDetail handleClose={() => updateOpenWorkDetail(false)} {...work} />}
    </>
  );
};

export default WorkCard;
