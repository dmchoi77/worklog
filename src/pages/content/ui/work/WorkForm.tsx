'use client';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Paper, Button } from '@mui/material';
import { WorkStatusButton } from './WorkStatusButton';
import { useAddWork } from '../../api/work/queries';
import { WorkCategory, WorkCategoryOptions } from '../../model';
import { paperStyle, textAreaStyle, buttonStyle } from '../form.style';
import { Input } from '~/shared/components/input/Input';
import useInput from '~/shared/hooks/useInput';
import { useSnackbarStore } from '~/shared/stores/useSnackbarStore';

interface WorkFormProps {
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

const WorkForm = ({ targetDate }: WorkFormProps) => {
  const [category, updateCategory] = useState<WorkCategory>('UPDATE');

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
      <Input
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
      <div className='flex justify-between items-center gap-x-[5px] w-[180px]'>
        <WorkStatusButton options={WorkCategoryOptions} onSelectOption={updateCategory} defaultOption={category} />
        <Button sx={buttonStyle} variant='contained' onClick={handleAddWork}>
          저장하기
        </Button>
      </div>
    </Paper>
  );
};

export default WorkForm;
