import { SubmitHandler, useForm } from 'react-hook-form';
import Dialog from '~/components/dialog/Dialog';
import { useSignIn } from '~/store/queries/user';
import { useDialogStore } from '~/store/stores/useDialogStore';
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
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const { open, updateDialogState } = useDialogStore();

  const { mutate: handleSignIn } = useSignIn();

  const onSubmit: SubmitHandler<Inputs> = ({ username, email, password, passwordCheck }) => {
    if (password !== passwordCheck) {
      return updateDialogState({
        open: true,
        mainText: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        cancelText: '',
      });
    }

    handleSignIn({
      username,
      email,
      password,
      passwordCheck,
    });

    updateDialogState({
      open: true,
      mainText: '회원가입에 성공하였습니다.',
      cancelText: '',
    });
  };
  return (
    <SignInContainer>
      <div css={{ padding: '5px 0' }}>
        <span css={{ fontSize: 18, fontWeight: 700 }}>회원가입</span>
      </div>
      <SignInForm onSubmit={handleSubmit(onSubmit)}>
        <SignInInput type='text' placeholder='이름' {...register('username', { required: true })} />
        {/* 테스트용으로 input type text로 해놨음 나중에 email로 변경 필요 */}
        <SignInInput type='text' placeholder='이메일' {...register('email', { required: true })} />
        <SignInInput type='password' placeholder='비밀번호' {...register('password', { required: true })} />
        <SignInInput
          type='password'
          placeholder='비밀번호 확인'
          {...register('passwordCheck', { required: true })}
        />
        <SignInButton type='submit' value='회원가입' />
      </SignInForm>
      {open && <Dialog />}
    </SignInContainer>
  );
};

export default SignIn;
