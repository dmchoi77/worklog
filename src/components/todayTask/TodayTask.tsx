import { Button, Divider, Paper, TextField } from '@mui/material';
import SplitButton from '../button/SplitButton';
import BaseInput from '../input/BaseInput';
import WorkList from '../list/WorkList';

const TodayTask = () => {
  return (
    <div>
      <h2>Work</h2>

      <Paper
        elevation={1}
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
          // value={input}
          // onChange={handleInput}
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
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            width: '180px',
          }}
        >
          <SplitButton />
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
      <Divider
        variant='middle'
        textAlign='center'
        sx={{
          padding: 1,
          margin: 0,
        }}
      />
      <div
        css={{
          paddingTop: 15,
        }}
      >
        {new Array(6).fill({}).map((_, index) => (
          <WorkList key={index} />
        ))}
      </div>
    </div>
  );
};

export default TodayTask;
