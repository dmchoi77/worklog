'use client';
import UserRegistrationForm from './UserRegistrationForm';
import { UserRegistrationFormProvider } from './UserRegistrationFormProvider';
import Dialog from '~/shared/components/dialog/Dialog';
import { useDialogStore } from '~/shared/stores/useDialogStore';

const UserRegistrationPage = () => {
  const { open } = useDialogStore();

  return (
    <div className='w-[400px] h-[600px] flex flex-col gap-[1rem] items-center justify-center'>
      <span className='font-[600] text-[20px]'>회원가입</span>
      <UserRegistrationFormProvider>
        <UserRegistrationForm />
      </UserRegistrationFormProvider>
      {open && <Dialog />}
    </div>
  );
};

export default UserRegistrationPage;
