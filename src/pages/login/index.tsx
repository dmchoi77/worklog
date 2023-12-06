import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LoginButton, LoginContainer, LoginForm, LoginInput } from '~/styles/login/login.style';
import { useLogin } from '~/queries/user';
import Dialog from '~/components/dialog/Dialog';
import { RoutePath } from '~/constants/route';
import { useDialogStore } from '~/stores/useDialogStore';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate: handleLogin } = useLogin();
  const { open, updateDialogState } = useDialogStore();

  const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
    handleLogin(
      { username, password },
      {
        onSuccess: (data) => {
          router.push('/');
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
        <LoginButton type='submit' value='로그인' />
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
