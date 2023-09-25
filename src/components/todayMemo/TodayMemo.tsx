import { Button, Paper } from '@mui/material';
import { useState } from 'react';
import MemoList from '../list/MemoList';

const TodayMemo = () => {
  const [input, setInput] = useState('');

  const handleInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => setInput(value);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {};

  return (
    <div>
      <h2>MEMO</h2>

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
            border: 'none',
          }}
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
          >
            저장하기
          </Button>
        </div>
      </Paper>
      <div css={{}}>
        <MemoList />
        <MemoList />
        <MemoList />
      </div>
    </div>
  );
};

export default TodayMemo;
