'use client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from 'react';
import { AccessToken } from '~/constants';
import { useLogout } from '~/queries/user';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { getCookie } from '~/utils/cookie';
import { decodeJWT } from '~/utils/decodeJWT';

export const UserInfo = () => {
  const { username, updateUserInfoState } = useUserInfoState(({ updateUserInfoState, username }) => ({
    username,
    updateUserInfoState,
  }));

  const { mutate: handleLogout } = useLogout();

  useEffect(() => {
    if (username) return;

    const getAccessToken = getCookie(AccessToken);
    if (getAccessToken) {
      const { sub: username } = decodeJWT(getAccessToken);
      updateUserInfoState(username);
    }
  }, []);

  return (
    <div className='flex items-center gap-x-[8px]'>
      <AccountCircleIcon />
      <span>{username} 님</span>
      <button onClick={() => handleLogout()}>
        <span>로그아웃</span>
      </button>
    </div>
  );
};
