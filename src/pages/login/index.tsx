import { useRouter } from 'next/navigation';

import { SubmitHandler, useController, useForm } from 'react-hook-form';

import Dialog from '~/components/dialog/Dialog';
import { useLogin } from '~/queries/user';
import { useDialogStore } from '~/stores/useDialogStore';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { LoginButton, LoginContainer, LoginForm, LoginInput } from '~/styles/login/login.style';

import { RoutePath } from '~/constants';
import type { LoginInputForm } from '~/types';

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginInputForm>();

  const { mutate: handleLogin, status } = useLogin();

  const { open, updateDialogState } = useDialogStore();
  const updateUserInfoState = useUserInfoState((state) => state.updateUserInfoState);

  const isLoading = status === 'pending' || status === 'success';

  const onSubmit: SubmitHandler<LoginInputForm> = ({ username, password }) => {
    handleLogin(
      { username, password },
      {
        onSuccess: () => {
          updateUserInfoState(username);

          router.push('/today');
        },
        onError: (error: any) => {
          updateDialogState({
            open: true,
            mainText: error.errorMessage || '서버 점검 중입니다.',
            cancelText: '',
          });
        },
      },
    );
  };
  return (
    <LoginContainer>
      <div css={{ padding: '30px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p css={{ fontSize: 14 }}>오늘은 회사에서 어떤 일들이 펼쳐질까</p>
        <span css={{ fontSize: 34, fontWeight: 700 }}>오늘의 워크로그</span>
      </div>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginInput type='text' placeholder='아이디' {...register('username', { required: true })} />
        <LoginInput type='password' placeholder='비밀번호' {...register('password', { required: true })} />
        <LoginButton type='submit' isLoading={isLoading} disabled={isLoading}>
          {isLoading ? '로그인 중' : '로그인'}
        </LoginButton>
        <span
          onClick={() => router.push(RoutePath.SignIn)}
          css={{
            color: '#5e6776',
            fontSize: 16,
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          회원가입
        </span>
      </LoginForm>
      {open && <Dialog />}
    </LoginContainer>
  );
};
export default Login;
