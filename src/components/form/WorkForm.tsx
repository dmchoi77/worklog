import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import dayjs from 'dayjs';

import { Button, Paper } from '@mui/material';

import { buttonStyle, paperStyle, textAreaStyle } from './form.style';
import SplitButton from '../button/SplitButton';

import useInput from '~/hooks/useInput';
import { calendarQueryKeys } from '~/queries/calendar';
import { useAddWork, workQueryKeys } from '~/queries/work';
import { useSnackbarStore } from '~/stores/useSnackbarStore';
import { WorkCategoryType } from '~/types/apis/work.types';

interface IProps {
  targetDate: string;
}

const WorkForm = ({ targetDate }: IProps) => {
  const queryClient = useQueryClient();

  const [category, updateCategory] = useState<WorkCategoryType>('update');

  const { input, handleInput, reset } = useInput();
  const { mutate } = useAddWork();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);
  const handleAddWork = () => {
    mutate(
      { content: input.replace(/(?:\r\n|\r|\n)/g, '<br />'), date: targetDate, category: category },
      {
        onSuccess: () => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: '저장하였습니다.',
            vertical: 'bottom',
          });
          queryClient.invalidateQueries(workQueryKeys.fetchWorkList({}));
          queryClient.invalidateQueries(
            calendarQueryKeys.fetchCalendarDays({
              year: Number(dayjs(targetDate).get('year')),
              month: Number(dayjs(targetDate).get('month')) + 1,
            }),
          );

          reset();
          updateCategory('update');
        },
        onError: (error: any) => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: error.message,
            vertical: 'bottom',
          });
        },
      },
    );
  };
  return (
    <Paper elevation={1} css={paperStyle}>
      <textarea value={input} onChange={handleInput} autoFocus style={textAreaStyle} />
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          width: '180px',
        }}
      >
        <SplitButton options={['update', 'refactor', 'chore', 'feat']} selectedOption={updateCategory} />
        <Button sx={buttonStyle} variant='contained' onClick={handleAddWork}>
          저장하기
        </Button>
      </div>
    </Paper>
  );
};

export default WorkForm;
