import Link from 'next/link';
import { UserAvatar } from '../userAvatar/UserAvatar';
import { getTodayDate } from '~/shared/utils/date';

const todayDate = getTodayDate();
const Header = () => {
  return (
    <header className='bg-[#fffdfa] h-[50px] flex px-[10px] items-center justify-between border-[1px] border-solid border-[#e2e2e6]'>
      <Link href={`/content/${todayDate}`}>Today</Link>
      <UserAvatar />
    </header>
  );
};

export default Header;
