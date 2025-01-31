'use client';
import { useEffect } from 'react';
import { Avatar } from '@radix-ui/themes';
import { useLogout } from '~/queries/auth';

import { AccessToken } from '~/constants';
import { useUserInfoStore } from '~/shared/stores/useUserInfoStore';
import { getCookie } from '~/shared/utils/cookie';
import { decodeJWT } from '~/shared/utils/decodeJWT';

export const UserInfo = () => {
  const { username, updateUserName } = useUserInfoStore();

  const { mutate: handleLogout } = useLogout();

  useEffect(() => {
    if (username) return;

    const getAccessToken = getCookie(AccessToken);
    if (getAccessToken) {
      const { sub: username } = decodeJWT(getAccessToken);
      updateUserName(username);
    }
  }, []);

  return (
    <div className='flex items-center gap-x-[8px]'>
      <Avatar size='1' variant='solid' color='indigo' radius='full' fallback={username[0]} />
      <button onClick={() => handleLogout()}>
        <span className='text-[14px] font-[500]'>로그아웃</span>
      </button>
    </div>
  );
};
