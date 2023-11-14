import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Layout, LoginButton, LoginContainer, LoginForm, LoginInput } from './login.style';
import { useLogin } from '~/hooks/queries/user';
import useDialog from '~/hooks/useDialog';
import Dialog from '~/components/dialog/Dialog';
import { RoutePath } from '~/constants/route';

type Inputs = {
  id: string;
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
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { open, setDialog, onClose } = useDialog();

  const { mutate: handleLogin } = useLogin();

  const onSubmit: SubmitHandler<Inputs> = ({ id, password }) => {
    setDialog((prev) => ({
      ...prev,
      cancelText: '',
      open: true,
      mainText: '로그인했다',
      handleConfirm: onClose,
    }));

    handleLogin({ username: id, password });
  };

  return (
    <Layout>
      <LoginContainer>
        <div css={{ padding: '30px 0' }}>
          <span css={{ fontSize: 30, fontWeight: 700 }}>Today worklog</span>
        </div>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <LoginInput type='text' placeholder='아이디' {...register('id', { required: true })} />
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
      </LoginContainer>
      {open && <Dialog />}
    </Layout>
  );
};
export default Login;
