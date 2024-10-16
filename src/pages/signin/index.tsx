import Dialog from '~/components/molecules/dialog/Dialog';
import SignInForm from '~/components/templates/signIn/SignInForm';
import { useDialogStore } from '~/stores/useDialogStore';

const SignInPage = () => {
  const { open } = useDialogStore();

  return (
    <div className='w-[400px] h-[600px] flex flex-col gap-[1rem] items-center justify-center'>
      <div css={{ padding: '5px 0' }}>
        <span css={{ fontSize: 18, fontWeight: 700 }}>회원가입</span>
      </div>
      <SignInForm />
      {open && <Dialog />}
    </div>
  );
};

export default SignInPage;
