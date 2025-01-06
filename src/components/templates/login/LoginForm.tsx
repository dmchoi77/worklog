import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '~/components/molecules/button/Button';
import { AlertDialog } from '~/components/molecules/dialog/AlertDialog';
import { Input } from '~/components/molecules/input/Input';
import { useAlertDialogStore } from '~/stores/useAlertDialogStore';
import { commonResponseErrorHandler } from '~/utils/http';
import { RoutePath } from '~/constants';
import { useLogin } from '~/queries';
import { LoginInputForm } from '~/types';

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginInputForm>();

  const router = useRouter();

  const { mutate: handleLogin, isPending } = useLogin();
  const { openDialog } = useAlertDialogStore();
  const onSubmit: SubmitHandler<LoginInputForm> = ({ username, password }) => {
    handleLogin(
      { username, password },
      {
        onError: (error) => {
          const errorResponse = commonResponseErrorHandler(error);
          openDialog(
            <AlertDialog
              actionText='확인'
              title='로그인 실패'
              description={errorResponse?.message || '서버 점검 중입니다.'}
            />,
          );
        },
      },
    );
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

export default LoginForm;
