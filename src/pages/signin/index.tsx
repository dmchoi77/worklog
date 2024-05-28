import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import Dialog from '~/components/dialog/Dialog';
import { RoutePath } from '~/constants/route';
import { useCheckEmail, useCheckUsername, useLogin, useSignIn } from '~/queries/user';
import { useDialogStore } from '~/stores/useDialogStore';
import {
  LoginContainer as SignInContainer,
  LoginButton as SignInButton,
  LoginForm as SignInForm,
  LoginInput as SignInInput,
} from '~/styles/login/login.style';

type Inputs = {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
};

const SignIn = () => {
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<Inputs>();
  const username = watch('username');
  const email = watch('email');

  const { open, updateDialogState } = useDialogStore();

  const { mutate: handleSignIn } = useSignIn();
  const { mutate: handleLogin } = useLogin();

  const { data: checkUsername, refetch: refetchCheckUsername } = useCheckUsername(username);
  const { data: checkEmail, refetch: refetchCheckEmail } = useCheckEmail(email);

  const onSubmit: SubmitHandler<Inputs> = ({ username, email, password, passwordCheck }) => {
    if (password !== passwordCheck) {
      return updateDialogState({
        open: true,
        mainText: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        cancelText: '',
      });
    }

    handleSignIn(
      {
        username,
        email,
        password,
        passwordCheck,
      },
      {
        onSuccess: () =>
          updateDialogState({
            open: true,
            mainText: '회원가입에 성공하였습니다.',
            cancelText: '',
            handleConfirm: () => {
              handleLogin(
                { username, password },
                {
                  onSuccess: () => {
                    router.push('/today');
                  },
                  onError: (error: any) => {
                    console.log(error);
                  },
                },
              );
            },
          }),
        onError: (error: any) => {
          updateDialogState({
            open: true,
            mainText: error?.response?.data?.message || '서버 점검 중입니다.',
            cancelText: '',
          });
        },
      },
    );
  };

  useEffect(() => {
    if (!email) return;
    refetchCheckEmail();
  }, [email]);

  useEffect(() => {
    if (!username) return;
    refetchCheckUsername();
  }, [username]);

  return (
    <SignInContainer>
      <div css={{ padding: '5px 0' }}>
        <span css={{ fontSize: 18, fontWeight: 700 }}>회원가입</span>
      </div>
      <SignInForm onSubmit={handleSubmit(onSubmit)}>
        <SignInInput type='text' placeholder='아이디' {...register('username', { required: true })} />
        <ValidateDescription field={username} status={checkUsername?.status} message={checkUsername?.message} />

        <SignInInput type='email' placeholder='이메일' {...register('email', { required: true })} />
        <ValidateDescription field={email} status={checkEmail?.status} message={checkEmail?.message} />

        <SignInInput type='password' placeholder='비밀번호' {...register('password', { required: true })} />
        <SignInInput type='password' placeholder='비밀번호 확인' {...register('passwordCheck', { required: true })} />
        <SignInButton type='submit'>회원가입</SignInButton>
        <span
          onClick={() => router.push(RoutePath.Login)}
          css={{
            color: '#5e6776',
            fontSize: 16,
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          뒤로 가기
        </span>
      </SignInForm>
      {open && <Dialog />}
    </SignInContainer>
  );
};

export default SignIn;

const ValidateDescription = ({ field, status, message }: { field: string; status?: number; message?: string }) => {
  return <>{field && <span css={{ fontSize: 12, color: status === 200 ? 'green' : 'red' }}>{message}</span>}</>;
};
