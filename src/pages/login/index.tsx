import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import Dialog from '~/components/dialog/Dialog';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/cookie';
import { RoutePath } from '~/constants/route';
import { useLogin } from '~/queries/user';
import { useDialogStore } from '~/stores/useDialogStore';
import { LoginButton, LoginContainer, LoginForm, LoginInput } from '~/styles/login/login.style';
import { removeCookie } from '~/utils/cookie';

type Inputs = {
  username: string;
  password: string;
};

const loginDescription = {
  error: {
    username: '아이디를 입력해주세요.',
    password: '비밀번호를 입력해주세요.',
  },
} as const;

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();

  const { mutate: handleLogin, status } = useLogin();
  const { open, updateDialogState } = useDialogStore();

  const isLoading = status === 'pending' || status === 'success';

  const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
    handleLogin(
      { username, password },
      {
        onSuccess: () => {
          router.push('/today');
        },
        onError: (error: any) => {
          updateDialogState({
            open: true,
            mainText: error?.response?.data.message,
            cancelText: '',
          });
        },
      },
    );
  };
  useEffect(() => {
    removeCookie(REFRESH_TOKEN);
    removeCookie(ACCESS_TOKEN);
  }, []);

  return (
    <LoginContainer>
      <div css={{ padding: '30px 0' }}>
        <span css={{ fontSize: 30, fontWeight: 700 }}>Today worklog</span>
      </div>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginInput type='text' placeholder='아이디' {...register('username', { required: true })} />
        {/* {errors.id && <span>{loginDescription.error.username}</span>} */}
        <LoginInput type='password' placeholder='비밀번호' {...register('password', { required: true })} />
        {/* {errors.password && <span>{loginDescription.error.password}</span>} */}
        <LoginButton
          type='submit'
          value={isLoading ? '로그인 중' : '로그인'}
          isLoading={isLoading}
          disabled={isLoading}
        />
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
