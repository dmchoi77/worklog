import { LoginForm } from './LoginForm';
import { LoginTitle } from './LoginTitle';
import Dialog from '~/shared/components/dialog/Dialog';
import { useDialogStore } from '~/shared/stores/useDialogStore';

export const LoginPage = () => {
  const { open } = useDialogStore();

  return (
    <div className='w-[400px] h-[600px] flex flex-col gap-y-[10px] items-center justify-center'>
      <LoginTitle />
      <LoginForm />
      {open && <Dialog />}
    </div>
  );
};
