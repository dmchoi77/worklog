import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  width: 100%;
  height: 50px;
  background-color: #eca7a7;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <span>FOOTER</span>
    </FooterContainer>
  );
};

export default Footer;
