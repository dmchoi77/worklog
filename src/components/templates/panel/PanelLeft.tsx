import { Divider } from '@mui/material';
import { PanelLeftList } from './PanelLeftList';
import SearchInput from '../../molecules/input/SearchInput';

const PanelLeft = () => (
  <div className='bg-[#303030] border-r-[1px] border-[#d5d5d552] min-w-[200px] max-w-[200px] overflow-y-auto'>
    <div className='flex h-[50px] items-center justify-center'>
      <span className='text-[#F5F5F5] text-[16px] font-semibold'>오늘의 워크로그</span>
    </div>
    <SearchInput />
    <Divider />
    <PanelLeftList />
  </div>
);

export default PanelLeft;
