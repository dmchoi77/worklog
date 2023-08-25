import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const HeaderContainer = styled.header`
  width: 100%;
  height: 50px;
  background-color: #c0c0c0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <HeaderContainer>
      <span
        css={{
          fontSize: 20,
          fontWeight: 700,
          padding: 20,
        }}
      >
        My Work Log
      </span>
      <span
        css={{
          fontSize: 14,
          fontWeight: 700,
          padding: 20,
        }}
      >
        로그아웃
      </span>
    </HeaderContainer>
  );
};

export default Header;
