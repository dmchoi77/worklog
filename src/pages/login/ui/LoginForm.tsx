import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLogin } from '../api/queries';
import { LoginPayload } from '../api/types';
import { Button } from '~/shared/components/button/Button';
import { Input } from '~/shared/components/input/Input';
import { RoutePath } from '~/shared/constants';

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginPayload>();

  const router = useRouter();

  const { mutate: handleLogin, isPending } = useLogin();

  const onSubmit: SubmitHandler<LoginPayload> = ({ username, password }) => {
    handleLogin({ username, password });
  };

  return (
    <form className='flex flex-col w-full gap-[10px]' onSubmit={handleSubmit(onSubmit)}>
      <Input type='text' placeholder='아이디' {...register('username', { required: true })} />
      <Input type='password' placeholder='비밀번호' {...register('password', { required: true })} />
      <Button isLoading={isPending} label='로그인' />
      <Button label='회원가입' variant='outlined' onClick={() => router.push(RoutePath.Registration)} />
    </form>
  );
};
