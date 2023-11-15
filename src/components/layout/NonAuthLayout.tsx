import styled from '@emotion/styled';

const Layout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
});

type Props = { children: React.ReactNode };

const NonAuthLayout = ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};

export default NonAuthLayout;
