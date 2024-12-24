import { Divider } from '@mui/material';
import { DashboardLeftList } from './DashboardLeftList';
import SearchInput from '../../molecules/input/SearchInput';

const DashboardLeft = () => (
  <div className='bg-[#303030] border-r-[1px] border-[#d5d5d552] min-w-[200px] max-w-[200px] overflow-y-auto'>
    <div className='flex h-[50px] items-center justify-center'>
      <span className='text-[#F5F5F5] text-[16px] font-semibold'>오늘의 워크로그</span>
    </div>
    <SearchInput />
    <Divider />
    <DashboardLeftList />
  </div>
);

export default DashboardLeft;
