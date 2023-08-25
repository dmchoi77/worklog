import styled from '@emotion/styled';
import Header from '~/components/header/Header';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const MasterLayout: React.FC<IProps> = ({ children }) => {
  return (
    <MasterLayoutContainer>
      <Header />
      <PageArea>{children}</PageArea>
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

const PageArea = styled.main`
  display: flex;
  flex-direction: column;
  /* padding: 10px 0; */
  /* border: 1px solid #dadada87; */
  width: 100%;
  height: calc(100% - 55px);
  overflow: hidden;

  @media (max-width: 320px) {
    height: calc(100% - 40px);
  }
`;
