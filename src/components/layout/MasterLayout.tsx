import { PropsWithChildren, useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../header/Header';
import MobileAppBar from '../mobileAppBar/MobileAppBar';
import PanelLeft from '../panel/PanelLeft';
import CustomSnackbar from '../snackbar/Snackbar';

import { useUserInfoState } from '~/stores/useUserInfoStore';
import { getCookie } from '~/utils/cookie';
import { decodeJWT } from '~/utils/decodeJWT';

import { AccessToken } from '~/constants';
import type { UserAgent } from '~/types';

interface MasterLayoutProps {
  userAgent: UserAgent;
}
const MasterLayout = ({ children, userAgent }: PropsWithChildren<MasterLayoutProps>) => {
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
    <MasterLayoutContainer>
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
        <PanelRightContainer>
          {isMobile ? <MobileAppBar /> : <Header />}
          {children}
        </PanelRightContainer>
      </div>
      <CustomSnackbar />
    </MasterLayoutContainer>
  );
};

export default MasterLayout;

const MasterLayoutContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const PanelRightContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
