import { PropsWithChildren, useEffect } from 'react';

import Header from '../../organisms/header/Header';
import MobileAppBar from '../../organisms/mobileAppBar/MobileAppBar';
import PanelLeft from '../../organisms/panel/PanelLeft';
import CustomSnackbar from '../../molecules/snackbar/Snackbar';

import { useUserInfoState } from '~/stores/useUserInfoStore';
import { getCookie } from '~/utils/cookie';
import { decodeJWT } from '~/utils/decodeJWT';

import { AccessToken } from '~/constants';
import type { UserAgent } from '~/types';

interface MasterLayoutProps {
  userAgent: UserAgent;
}
export const MasterLayout = ({ children, userAgent }: PropsWithChildren<MasterLayoutProps>) => {
  const { username, updateUserInfoState } = useUserInfoState((state) => ({
    username: state.username,
    updateUserInfoState: state.updateUserInfoState,
  }));

  useEffect(() => {
    if (username) return;

    const getAccessToken = getCookie(AccessToken);
    if (getAccessToken) {
      const { sub: username } = decodeJWT(getAccessToken);
      updateUserInfoState(username);
    }
  }, []);

  // useServerSentEvent();

  const isMobile = userAgent === 'mobile';
  return (
    <div className='w-full max-w-full h-auto flex flex-col justify-start items-center m-0 p-0'>
      <div
        className='panel-container'
        css={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
        }}
      >
        <PanelLeft />
        <div className='flex flex-col w-full'>
          {isMobile ? <MobileAppBar /> : <Header />}
          {children}
        </div>
      </div>
      <CustomSnackbar />
    </div>
  );
};
