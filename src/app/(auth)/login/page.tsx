'use client';
import LoginForm from '~/components/templates/login/LoginForm';
import LoginTitle from '~/components/templates/login/LoginTitle';

const LoginPage = () => (
  <div className='w-[400px] h-[600px] flex flex-col gap-y-[10px] items-center justify-center'>
    <LoginTitle />
    <LoginForm />
  </div>
);
export default LoginPage;
