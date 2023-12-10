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
  gap: '1.5rem',
  width: '100%',
  flexDirection: 'column',
});

const LoginButton = styled.input<{ isLoading?: boolean }>`
  height: 50px;
  border-radius: 10px;
  color: #ffffff;
  background-color: ${(props) => (props.isLoading ? '#999' : '#2f2f2f')};
  border: 1px solid #cfcfcf;
  font-size: 16px;
  fontweight: 600;
  padding: 5px;
  cursor: pointer;
`;

export { LoginButton, LoginContainer, LoginForm, LoginInput };
