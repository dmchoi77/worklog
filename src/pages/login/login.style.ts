import styled from '@emotion/styled';

const Layout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
});

const LoginContainer = styled.div({
  width: '400px',
  height: '600px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',
});

const LoginInput = styled.input({
  height: '50px',
  borderRadius: '10px',
  border: '1px solid #cfcfcf',
  padding: '10px',
});

const LoginForm = styled.form({
  display: 'flex',
  gap: '0.6rem',
  width: '100%',
  flexDirection: 'column',
});

const LoginButton = styled.input({
  height: '50px',
  borderRadius: '10px',
  color: '#ffffff',
  backgroundColor: '#7272eb',
  border: '1px solid #cfcfcf',
  fontSize: '16px',
  fontWeight: 600,
  padding: '5px',
  cursor: 'pointer',
});

export { Layout, LoginContainer, LoginButton, LoginInput, LoginForm };
