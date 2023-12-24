import { useQueryClient } from '@tanstack/react-query';

import { Paper, Button } from '@mui/material';

import useInput from '~/hooks/useInput';
import { useAddMemo, memoQueryKeys } from '~/queries/memo';
import { useSnackbarStore } from '~/stores/useSnackbarStore';

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
          queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({}));

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
    <Paper
      elevation={1}
      className='input-container'
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        backgroundColor: '#dbdbdb42',
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        height: '150px',
        borderRadius: 10,
      }}
    >
      <textarea
        value={input}
        onChange={handleInput}
        style={{
          width: '100%',
          height: '120px',
          fontSize: '15px',
          resize: 'none',
          padding: 10,
          borderRadius: 8,
          border: '1px solid rgb(153 153 153 / 38%)',
        }}
        // onKeyDown={(e) => {
        //   if (e.shiftKey && e.key === 'Enter') return;
        //   if (e.key === 'Enter') return handleAddMemo();
        // }}
      />
      <div
        css={{
          display: 'flex',
          gap: 10,
        }}
      >
        <Button
          sx={{
            height: '30px',
            '.MuiButtonGroup-firstButton': {
              width: '60px',
              textAlign: 'left',
              justifyContent: 'flex-start',
              padding: 1,
            },
            '.MuiButtonGroup-lastButton': {
              width: '12px',
              minWidth: '12px',
            },
          }}
          variant='contained'
          onClick={handleAddMemo}
        >
          저장하기
        </Button>
      </div>
    </Paper>
  );
};

export default MemoForm;
