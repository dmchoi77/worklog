import styled from '@emotion/styled';

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
  backgroundColor: '#2f2f2f',
  border: '1px solid #cfcfcf',
  fontSize: '16px',
  fontWeight: 600,
  padding: '5px',
  cursor: 'pointer',
});

export { LoginButton, LoginContainer, LoginForm, LoginInput };
