import styled from '@emotion/styled';

const LoginContainer = styled.div({
  width: '400px',
  height: '600px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',

  '@media (max-width: 640px)': {
    padding: '10%',
    width: '100%',
  },
});

const LoginInput = styled.input({
  height: '50px',
  borderRadius: '10px',
  border: '1px solid #cfcfcf',
  padding: '10px',
});

const LoginForm = styled.form({
  display: 'flex',
  gap: '0.5rem',
  width: '100%',
  flexDirection: 'column',
});

export { LoginContainer, LoginForm, LoginInput };
