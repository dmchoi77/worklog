import Link from 'next/link';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useUserInfoState } from '~/stores/useUserInfoStore';

import { useLogout } from '~/queries';

const Header: React.FC = () => {
  const username = useUserInfoState((state) => state.username);

  const { mutate: handleLogout } = useLogout();

  return (
    <header className='bg-[#fffdfa] w-full h-[50px] flex pl-[10px] pr-[10px] items-center justify-between border-[1px] border-solid border-[#e2e2e6]'>
      <Link href='/today'>Today</Link>
      <div css={{ display: 'flex', alignItems: 'center' }}>
        <AccountCircleIcon />
        <span css={{ margin: 5 }}>{username} 님</span>
        <button css={{ paddingLeft: 10, paddingRight: 20 }}>
          <span css={{ fontSize: 14, fontWeight: 600, cursor: 'pointer' }} onClick={() => handleLogout()}>
            로그아웃
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
