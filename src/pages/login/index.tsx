import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '~/components/button/Button';
import Dialog from '~/components/dialog/Dialog';
import { Input } from '~/components/input/Input';
import { useLogin } from '~/queries/user';
import { useDialogStore } from '~/stores/useDialogStore';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { commonResponseErrorHandler } from '~/utils/http';

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
    <div className='w-[400px] h-[600px] flex flex-col gap-[1rem] items-center justify-center'>
      <div className='flex flex-col gap-[8px] pb-[30px]'>
        <p className='text-[14px]'>오늘은 회사에서 어떤 일들이 펼쳐질까</p>
        <span className='text-[34px] font-[700]'>오늘의 워크로그</span>
      </div>
      <form className='flex flex-col w-full gap-[10px]' onSubmit={handleSubmit(onSubmit)}>
        <Input type='text' placeholder='아이디' {...register('username', { required: true })} />
        <Input type='password' placeholder='비밀번호' {...register('password', { required: true })} />
        <Button isLoading={isLoading}>로그인</Button>
        <span
          className='text-[16px] text-[#5e6776] text-center cursor-pointer'
          onClick={() => router.push(RoutePath.SignIn)}
        >
          회원가입
        </span>
      </form>
      {open && <Dialog />}
    </div>
  );
};
export default Login;
