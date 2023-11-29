import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const HeaderContainer = styled.header`
  background-color: #fffdfa;
  width: 100%;
  height: 50px;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e2e2e6;
`;

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <HeaderContainer>
      <div>  
        <span
          css={{
            cursor: 'pointer',
          }}
          onClick={() => router.push('/today')}
        >
          Today
        </span>
      </div>
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