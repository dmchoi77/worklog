'use client';
import { useEffect } from 'react';
import { Avatar } from '@radix-ui/themes';
import { useLogout } from '~/queries/user';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { getCookie } from '~/utils/cookie';
import { decodeJWT } from '~/utils/decodeJWT';
import { AccessToken } from '~/constants';

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
      <Avatar size='1' variant='solid' color='blue' radius='full' fallback={username[0]} />
      <button onClick={() => handleLogout()}>
        <span className='text-[14px] font-[500]'>로그아웃</span>
      </button>
    </div>
  );
};
