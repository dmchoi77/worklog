import Link from 'next/link';
import { useRouter } from 'next/router';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '~/components/molecules/button/Button';
import { Input } from '~/components/molecules/input/Input';
import { useDialogStore } from '~/stores/useDialogStore';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { commonResponseErrorHandler } from '~/utils/http';

import { RoutePath } from '~/constants';
import { useLogin } from '~/queries';
import { LoginInputForm } from '~/types';

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginInputForm>();

  const router = useRouter();

  const updateUserInfoState = useUserInfoState((state) => state.updateUserInfoState);
  const updateDialogState = useDialogStore((state) => state.updateDialogState);

  const { mutate: handleLogin, isPending } = useLogin();

  const onSubmit: SubmitHandler<LoginInputForm> = ({ username, password }) => {
    handleLogin(
      { username, password },
      {
        onSuccess: () => {
          updateUserInfoState(username);

          router.push('/today');
        },
        onError: (error: any) => {
          const errorResponse = commonResponseErrorHandler(error);
          updateDialogState({
            open: true,
            mainText: errorResponse?.message || '서버 점검 중입니다.',
            cancelText: '',
          });
        },
      },
    );
  };

  return (
    <form className='flex flex-col w-full gap-[10px]' onSubmit={handleSubmit(onSubmit)}>
      <Input type='text' placeholder='아이디' {...register('username', { required: true })} />
      <Input type='password' placeholder='비밀번호' {...register('password', { required: true })} />
      <Button isLoading={isPending}>로그인</Button>
      <Link className='mx-auto' href={RoutePath.SignIn}>
        <span className='text-[16px] text-[#5e6776] text-center cursor-pointer'>회원가입</span>
      </Link>
    </form>
  );
};

export default LoginForm;
