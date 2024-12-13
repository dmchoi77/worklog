'use client';
import Dialog from '~/components/molecules/dialog/Dialog';
import SignInForm from '~/components/templates/signIn/SignInForm';
import { useDialogStore } from '~/stores/useDialogStore';

const SignInPage = () => {
  const { open } = useDialogStore();

  return (
    <div className='w-[400px] h-[600px] flex flex-col gap-[1rem] items-center justify-center'>
      <span className='font-[600] text-[20px]'>회원가입</span>
      <SignInForm />
      {open && <Dialog />}
    </div>
  );
};

export default SignInPage;
