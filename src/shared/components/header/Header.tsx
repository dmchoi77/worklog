import Link from 'next/link';
import { UserAvatar } from '../userAvatar/UserAvatar';

const Header = () => {
  const date = new Date();
  const todayDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;

  return (
    <header className='bg-[#fffdfa] h-[50px] flex px-[10px] items-center justify-between border-[1px] border-solid border-[#e2e2e6]'>
      <Link href={`/content/${todayDate}`}>Today</Link>
      <UserAvatar />
    </header>
  );
};

export default Header;
