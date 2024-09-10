import { Divider } from '@mui/material';

import { PanelLeftList } from './PanelLeftList';
import SearchInput from '../../molecules/input/SearchInput';

const PanelLeft = () => (
  <div
    css={{
      backgroundColor: '#303030',
      borderRight: '1px solid #d5d5d552',
      minWidth: '200px',
      maxWidth: '200px',

      '@media (max-width: 640px)': {
        display: 'none',
      },
    }}
  >
    <div css={{ display: 'flex', height: 50, alignItems: 'center', justifyContent: 'center' }}>
      <span css={{ color: '#F5F5F5', fontSize: 16, fontWeight: 600 }}>오늘의 워크로그</span>
    </div>
    <SearchInput />
    <Divider />
    <PanelLeftList />
  </div>
);

export default PanelLeft;
