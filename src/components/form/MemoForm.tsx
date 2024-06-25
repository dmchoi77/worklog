import { useQueryClient } from '@tanstack/react-query';

import dayjs from 'dayjs';

import { Paper, Button } from '@mui/material';

import { buttonStyle, paperStyle, textAreaStyle } from './form.style';

import useInput from '~/hooks/useInput';
import { useSnackbarStore } from '~/stores/useSnackbarStore';

import { calendarQueryKeys, useAddMemo, memoQueryKeys } from '~/queries';

interface IProps {
  targetDate: string;
}
const MemoForm = ({ targetDate }: IProps) => {
  const queryClient = useQueryClient();

  const { input, handleInput, reset } = useInput();
  const { mutate } = useAddMemo();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);
  const handleAddMemo = () => {
    mutate(
      { content: input.replace(/(?:\r\n|\r|\n)/g, '<br />'), date: targetDate },
      {
        onSuccess: () => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: '저장하였습니다.',
            vertical: 'bottom',
          });
          queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({ date: targetDate }));
          queryClient.invalidateQueries(
            calendarQueryKeys.fetchCalendarDays({
              year: Number(dayjs(targetDate).get('year')),
              month: Number(dayjs(targetDate).get('month')) + 1,
            }),
          );

          reset();
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
    <Paper elevation={1} className='input-container' style={paperStyle}>
      <textarea
        placeholder='내용'
        value={input}
        onChange={handleInput}
        style={textAreaStyle}
        // onKeyDown={(e) => {
        //   if (e.shiftKey && e.key === 'Enter') return;
        //   if (e.key === 'Enter') return handleAddMemo();
        // }}
      />
      <div
        css={{
          display: 'flex',
          justifyContent: 'flex-end',

          gap: 10,
          width: '180px',
        }}
      >
        <Button sx={buttonStyle} variant='contained' onClick={handleAddMemo}>
          저장하기
        </Button>
      </div>
    </Paper>
  );
};

export default MemoForm;
