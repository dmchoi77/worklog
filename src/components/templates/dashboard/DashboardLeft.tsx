import Image from 'next/image';
import { Divider } from '@mui/material';
import { DashboardLeftList } from './DashboardLeftList';
import logo from '/public/assets/images/logo_white.png';
import SearchInput from '../../molecules/input/SearchInput';

const DashboardLeft = () => (
  <div className='bg-[#303030] border-r-[1px] border-[#d5d5d552] min-w-[200px] max-w-[200px] overflow-y-auto'>
    <div className='flex h-[50px] items-center justify-center'>
      <Image src={logo.src} alt='logo' width={130} height={logo.height} />
    </div>
    <hr className='bg-gray-400'/>
    {/* <SearchInput /> */}
    <Divider />
    <DashboardLeftList />
  </div>
);

export default DashboardLeft;
