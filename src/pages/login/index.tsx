import Dialog from '~/components/molecules/dialog/Dialog';
import LoginForm from '~/components/templates/login/LoginForm';
import LoginTitle from '~/components/templates/login/LoginTitle';
import { useDialogStore } from '~/stores/useDialogStore';

const LoginPage = () => {
  const { open } = useDialogStore();

  return (
    <div className='w-[400px] h-[600px] flex flex-col gap-[1rem] items-center justify-center'>
      <LoginTitle />
      <LoginForm />
      {open && <Dialog />}
    </div>
  );
};
export default LoginPage;
