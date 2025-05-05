'use client';
import { UserRegistrationFormProvider, UserRegistrationForm } from '~/features/auth/ui';
import { useDialogStore } from '~/shared/stores/useDialogStore';
import Dialog from '~/shared/ui/dialog/Dialog';

const UserRegistration = () => {
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

export default UserRegistration;
