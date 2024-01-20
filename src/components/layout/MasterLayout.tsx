import { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../header/Header';
import PanelLeft from '../panel/PanelLeft';
import CustomSnackbar from '../snackbar/Snackbar';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/cookie';
import useServerSentEvent from '~/hooks/useServerSentEvent';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { getCookie } from '~/utils/cookie';
import { decodeJWT } from '~/utils/decodeJWT';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const MasterLayout = ({ children }: IProps) => {
  const { username, updateUserInfoState } = useUserInfoState((state) => ({
    username: state.username,
    updateUserInfoState: state.updateUserInfoState,
  }));

  const refreshToken = getCookie(REFRESH_TOKEN);

  useEffect(() => {
    if (username) return;

    const getAccessToken = getCookie(ACCESS_TOKEN);
    if (getAccessToken) {
      const { sub: username } = decodeJWT(getAccessToken);
      updateUserInfoState(username);
    }
  }, []);
  // useServerSentEvent();

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
          <Header />
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
