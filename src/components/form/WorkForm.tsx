import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import dayjs from 'dayjs';

import { Button, Paper } from '@mui/material';

import { buttonStyle, paperStyle, textAreaStyle } from './form.style';
import SplitButton from '../button/SplitButton';

import { WORK_CATEGORY_OPTIONS } from '~/constants/work';
import useInput from '~/hooks/useInput';
import { calendarQueryKeys } from '~/queries/calendar';
import { useAddWork, workQueryKeys } from '~/queries/work';
import { useSnackbarStore } from '~/stores/useSnackbarStore';
import { WorkCategoryType } from '~/types/apis/work.types';
interface IProps {
  targetDate: string;
}

const getDeadline = () => {
  // 현재 날짜와 시간을 가져오기
  let currentDate = dayjs();
  // 1일을 더하기
  let nextDay = currentDate.add(1, 'day');
  // 원하는 포맷으로 변환 (YYYY-MM-DD HH:mm)
  let formattedDate = nextDay.format('YYYY-MM-DD HH:mm');

  return formattedDate;
};

const WorkForm = ({ targetDate }: IProps) => {
  const queryClient = useQueryClient();

  const [category, updateCategory] = useState<WorkCategoryType>('UPDATE');

  const { input: inputTitle, handleInput: handleInputTitle, reset: resetTitle } = useInput();
  const { input: inputContent, handleInput: handleInputContent, reset: resetContent } = useInput();
  const { mutate } = useAddWork();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);
  const handleAddWork = () => {
    if (!inputTitle) {
      return updateSnackbarState({
        open: true,
        horizontal: 'center',
        message: '업무명을 입력해주세요.',
        vertical: 'bottom',
      });
    }
    mutate(
      {
        title: inputTitle.replace(/(?:\r\n|\r|\n)/g, '<br />'),
        content: inputContent.replace(/(?:\r\n|\r|\n)/g, '<br />'),
        date: targetDate,
        category: category,
        deadline: getDeadline(), // 데드라인 임시로 + 1일로 / TODO: 데드라인 설정 UI 개발
      },
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

          resetTitle();
          resetContent();
          updateCategory('UPDATE');
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
    <Paper elevation={1} style={{ ...paperStyle, height: 'auto' }}>
      <input
        placeholder='업무'
        value={inputTitle}
        onChange={handleInputTitle}
        autoFocus
        style={{ ...textAreaStyle, height: 50 }}
      />
      <textarea
        placeholder='상세 내용'
        value={inputContent}
        onChange={handleInputContent}
        style={{ ...textAreaStyle, height: 120 }}
      />
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
        <SplitButton options={WORK_CATEGORY_OPTIONS} onSelectOption={updateCategory} defaultOption={category} />
        <Button sx={buttonStyle} variant='contained' onClick={handleAddWork}>
          저장하기
        </Button>
      </div>
    </Paper>
  );
};

export default WorkForm;
