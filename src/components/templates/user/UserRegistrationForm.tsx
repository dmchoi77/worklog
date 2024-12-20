'use client';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Button } from '~/components/molecules/button/Button';
import { Input } from '~/components/molecules/input/Input';
import { UserRegisterationForm } from '~/constants/user';
import { useDialogStore } from '~/stores/useDialogStore';
import { RoutePath } from '~/constants';
import { useCheckUsername, useCheckEmail, useSignIn } from '~/queries';

interface InputProps {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
}

const UserRegistrationForm = () => {
  const { register, handleSubmit, watch } = useFormContext<UserRegisterationForm>();
  const username = watch('username');
  const email = watch('email');

  const { data: checkUsername, refetch: refetchCheckUsername } = useCheckUsername(username);
  const { data: checkEmail, refetch: refetchCheckEmail } = useCheckEmail(email);

  const { mutate: handleSignIn } = useSignIn();

  const updateDialogState = useDialogStore((state) => state.updateDialogState);

  const onSubmit: SubmitHandler<InputProps> = ({ username, email, password, passwordCheck }) => {
    if (password !== passwordCheck) {
      return updateDialogState({
        open: true,
        mainText: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        cancelText: '',
      });
    }

    handleSignIn({ username, email, password, passwordCheck });
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
      <Link className='mx-auto' href={RoutePath.Login}>
        <span className='text-[16px] text-[#5e6776] text-center cursor-pointer'>뒤로 가기</span>
      </Link>
    </form>
  );
};

export default UserRegistrationForm;

interface ValidatgeDescriptionProps {
  field: string;
  status?: number;
  message?: string;
}

const ValidateDescription = ({ field, status, message }: ValidatgeDescriptionProps) => (
  <Fragment>
    {field && <span style={{ fontSize: 12, color: status === 200 ? 'green' : 'red' }}>{message}</span>}
  </Fragment>
);
