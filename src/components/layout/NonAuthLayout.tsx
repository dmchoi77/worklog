import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

const Layout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
});

const NonAuthLayout = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};

export default NonAuthLayout;
