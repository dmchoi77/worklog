import router from 'next/router';

import { Fragment, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '~/components/molecules/button/Button';
import { Input } from '~/components/molecules/input/Input';
import { useDialogStore } from '~/stores/useDialogStore';

import { RoutePath } from '~/constants';
import { useCheckUsername, useCheckEmail, useLogin, useSignIn } from '~/queries';

interface InputProps {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
}

const SignInForm = () => {
  const { register, handleSubmit, watch } = useForm<InputProps>();
  const username = watch('username');
  const email = watch('email');

  const { data: checkUsername, refetch: refetchCheckUsername } = useCheckUsername(username);
  const { data: checkEmail, refetch: refetchCheckEmail } = useCheckEmail(email);

  const { mutate: handleSignIn } = useSignIn();
  const { mutate: handleLogin } = useLogin();

  const updateDialogState = useDialogStore((state) => state.updateDialogState);

  const onSubmit: SubmitHandler<InputProps> = ({ username, email, password, passwordCheck }) => {
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
    <form className='flex flex-col w-full gap-[10px]' onSubmit={handleSubmit(onSubmit)}>
      <Input type='text' placeholder='아이디' {...register('username', { required: true })} />
      <ValidateDescription field={username} status={checkUsername?.status} message={checkUsername?.message} />

      <Input type='email' placeholder='이메일' {...register('email', { required: true })} />
      <ValidateDescription field={email} status={checkEmail?.status} message={checkEmail?.message} />

      <Input type='password' placeholder='비밀번호' {...register('password', { required: true })} />
      <Input type='password' placeholder='비밀번호 확인' {...register('passwordCheck', { required: true })} />
      <Button type='submit'>회원가입</Button>
      <span
        className='text-[16px] text-[#5e6776] text-center cursor-pointer'
        onClick={() => router.push(RoutePath.Login)}
      >
        뒤로 가기
      </span>
    </form>
  );
};

export default SignInForm;

interface ValidatgeDescriptionProps {
  field: string;
  status?: number;
  message?: string;
}

const ValidateDescription = ({ field, status, message }: ValidatgeDescriptionProps) => (
  <Fragment>{field && <span css={{ fontSize: 12, color: status === 200 ? 'green' : 'red' }}>{message}</span>}</Fragment>
);
