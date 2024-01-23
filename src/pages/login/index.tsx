import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { triggerNotification } from '~/apis/notification';
import Dialog from '~/components/dialog/Dialog';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '~/constants/cookie';
import { RoutePath } from '~/constants/route';
import { useCheckNotification } from '~/queries/notification';
import { useLogin } from '~/queries/user';
import { useDialogStore } from '~/stores/useDialogStore';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { LoginButton, LoginContainer, LoginForm, LoginInput } from '~/styles/login/login.style';
import { removeCookie } from '~/utils/cookie';

type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();

  const { mutate: handleLogin, status } = useLogin();
  const { data: isTimeToNotice } = useCheckNotification(status === 'success');

  const { open, updateDialogState } = useDialogStore();
  const updateUserInfoState = useUserInfoState((state) => state.updateUserInfoState);
  const isLoading = status === 'pending' || status === 'success';

  const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
    handleLogin(
      { username, password },
      {
        onSuccess: () => {
          if (isTimeToNotice) triggerNotification();

          updateUserInfoState(username);

          router.push('/today');
        },
        onError: (error: any) => {
          updateDialogState({
            open: true,
            mainText: error?.message,
            cancelText: '',
          });
        },
      },
    );
  };

  useEffect(() => {
    removeCookie(REFRESH_TOKEN, { path: '/' });
    removeCookie(ACCESS_TOKEN, { path: '/' });
  }, []);

  return (
    <LoginContainer>
      <div css={{ padding: '30px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p css={{ fontSize: 14 }}>오늘은 회사에서 어떤 일들이 펼쳐질까</p>
        <span css={{ fontSize: 34, fontWeight: 700 }}>오늘의 워크로그</span>
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
