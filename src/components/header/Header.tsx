import { useRouter } from 'next/router';

import { Badge } from '@mui/material';

import styled from '@emotion/styled';
import { Notifications } from '@mui/icons-material';
import axios from 'axios';

import { useUserInfoState } from '~/stores/useUserInfoStore';
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
  const username = useUserInfoState((state) => state.username);

  const handleLogout = async () => {
    await axios.get('/api/logout');
    router.push('/login');
  };
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
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span css={{ margin: 20 }}>환영합니다. {username} 님</span>
        <Badge badgeContent={1} color='info'>
          <Notifications color='action' />
        </Badge>
        <div css={{ paddingLeft: 20, paddingRight: 20 }}>
          <span
            css={{
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={handleLogout}
          >
            로그아웃
          </span>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
