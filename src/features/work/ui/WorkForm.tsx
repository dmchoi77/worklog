'use client';
import { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { Paper, Button } from '@mui/material';
import { useAddWork } from '../model';
import { WorkCategory, WorkCategoryOptions } from '~/entities/work/api';
import { WorkStatusButton } from '~/entities/work/ui';
import { paperStyle, textAreaStyle, buttonStyle } from '~/features/common/ui';
import useInput from '~/shared/hooks/useInput';
import { useSnackbarStore } from '~/shared/stores/useSnackbarStore';
import { Input } from '~/shared/ui/input/Input';

const TITLE_PLACEHOLDER = '업무';
const CONTENT_PLACEHOLDER = '상세 내용';
const SAVE_BUTTON_TEXT = '저장하기';
const TITLE_ERROR_MESSAGE = '업무명을 입력해주세요.';
const SUCCESS_MESSAGE = '저장하였습니다.';

interface WorkFormProps {
  targetDate: string;
}

const getDefaultDeadline = () => {
  const currentDate = dayjs();
  const nextDay = currentDate.add(1, 'day');
  return nextDay.format('YYYY-MM-DD HH:mm');
};

const convertNewlinesToHtml = (text: string) => {
  return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
};

export const WorkForm = ({ targetDate }: WorkFormProps) => {
  const [category, setCategory] = useState<WorkCategory>('UPDATE');

  const { input: inputTitle, handleInput: handleInputTitle, reset: resetTitle } = useInput();
  const { input: inputContent, handleInput: handleInputContent, reset: resetContent } = useInput();
  const { mutate } = useAddWork();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const handleAddWork = useCallback(() => {
    if (!inputTitle) {
      return updateSnackbarState({
        open: true,
        horizontal: 'center',
        message: TITLE_ERROR_MESSAGE,
        vertical: 'bottom',
      });
    }

    mutate(
      {
        title: convertNewlinesToHtml(inputTitle),
        content: convertNewlinesToHtml(inputContent),
        date: targetDate,
        category: category,
        deadline: getDefaultDeadline(), // 데드라인 임시로 + 1일로 / TODO: 데드라인 설정 UI 개발
      },
      {
        onSuccess: () => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: SUCCESS_MESSAGE,
            vertical: 'bottom',
          });

          resetTitle();
          resetContent();
          setCategory('UPDATE');
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
  }, [inputTitle, inputContent, targetDate, category, mutate, updateSnackbarState, resetTitle, resetContent]);

  return (
    <Paper elevation={1} style={{ ...paperStyle, height: 'auto' }}>
      <Input
        placeholder={TITLE_PLACEHOLDER}
        value={inputTitle}
        onChange={handleInputTitle}
        autoFocus
        style={{ ...textAreaStyle, height: 50 }}
      />
      <textarea
        placeholder={CONTENT_PLACEHOLDER}
        value={inputContent}
        onChange={handleInputContent}
        style={{ ...textAreaStyle, height: 120 }}
      />
      <div className='flex justify-between items-center gap-x-[5px] w-[180px]'>
        <WorkStatusButton options={WorkCategoryOptions} onSelectOption={setCategory} defaultOption={category} />
        <Button sx={buttonStyle} variant='contained' onClick={handleAddWork}>
          {SAVE_BUTTON_TEXT}
        </Button>
      </div>
    </Paper>
  );
};
