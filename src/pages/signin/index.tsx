import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '~/components/button/Button';
import Dialog from '~/components/dialog/Dialog';
import { Input } from '~/components/input/Input';
import { RoutePath } from '~/constants/route';
import { useCheckEmail, useCheckUsername, useLogin, useSignIn } from '~/queries/user';
import { useDialogStore } from '~/stores/useDialogStore';

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
    <div className='w-[400px] h-[600px] flex flex-col gap-[1rem] items-center justify-center'>
      <div css={{ padding: '5px 0' }}>
        <span css={{ fontSize: 18, fontWeight: 700 }}>회원가입</span>
      </div>
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
      {open && <Dialog />}
    </div>
  );
};

export default SignIn;

const ValidateDescription = ({ field, status, message }: { field: string; status?: number; message?: string }) => {
  return <>{field && <span css={{ fontSize: 12, color: status === 200 ? 'green' : 'red' }}>{message}</span>}</>;
};
