'use client';
import { Paper, Button } from '@mui/material';
import { buttonStyle, paperStyle, textAreaStyle } from './form.style';
import useInput from '~/hooks/useInput';
import { useSnackbarStore } from '~/stores/useSnackbarStore';
import { useAddMemo, memoQueryKeys } from '~/queries';

interface IProps {
  targetDate: string;
}
const MemoForm = ({ targetDate }: IProps) => {
  const { input, handleInput, reset } = useInput();

  const { mutate } = useAddMemo();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);
  const handleAddMemo = () => {
    mutate(
      { content: input, date: targetDate },
      {
        onSuccess: () => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: '저장하였습니다.',
            vertical: 'bottom',
          });
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
      <div className='flex justify-end gap-x-[10px] w-[180px]'>
        <Button sx={buttonStyle} variant='contained' onClick={handleAddMemo}>
          저장하기
        </Button>
      </div>
    </Paper>
  );
};

export default MemoForm;
