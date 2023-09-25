import { Checkbox, Paper } from '@mui/material';
import SplitButton from '../button/SplitButton';

export default function WorkList() {
  return (
    <Paper
      elevation={1}
      css={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        height: 40,
        // backgroundColor: '#dbdbdb42',
        padding: 5,
        '&:hover': {
          backgroundColor: 'skyblue',
        },
        borderRadius: 6,
        margin: 5,
      }}
    >
      <div>
        <SplitButton />
        <span css={{ fontSize: 13, padding: 10 }}>User Service JWT 없이 호출되는 이슈 수정</span>
      </div>
      <Checkbox defaultChecked />
    </Paper>
  );
}
