'use client';
import { LoginTitle, LoginForm } from '~/features/auth/ui';
import { useDialogStore } from '~/shared/stores/useDialogStore';
import Dialog from '~/shared/ui/dialog/Dialog';

export const Login = () => {
  const { open } = useDialogStore();

  return (
    <div className='w-[400px] h-[600px] flex flex-col gap-y-[10px] items-center justify-center'>
      <LoginTitle />
      <LoginForm />
      {open && <Dialog />}
    </div>
  );
};
