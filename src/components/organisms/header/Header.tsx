import Link from 'next/link';
import { UserInfo } from '../userInfo/UserInfo';

const Header = () => (
  <header className='bg-[#fffdfa] h-[50px] flex px-[10px] items-center justify-between border-[1px] border-solid border-[#e2e2e6]'>
    <Link href='/today'>Today</Link>
    <UserInfo />
  </header>
);

export default Header;
