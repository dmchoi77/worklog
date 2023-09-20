import styled from '@emotion/styled';
import PanelLeft from '../panel/PanelLeft';
import Header from '../header/Header';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const MasterLayout: React.FC<IProps> = ({ children }) => {
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
