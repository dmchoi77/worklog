import { SubmitHandler, useForm } from 'react-hook-form';
import BaseInput from '~/components/input/BaseInput';

type Inputs = {
  id: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        css={{
          paddingLeft: '30%',
          paddingRight: '30%',
          width: '100%',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <span
          css={{
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          My worklog
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          css={{
            display: 'flex',
            gap: '0.6rem',
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <BaseInput placeholder='아이디' {...register('id')} />
          <BaseInput placeholder='비밀번호' {...register('password', { required: true })} />
          {/* {errors.password && <span>password error!</span>} */}
          <input
            type='submit'
            value='로그인'
            css={{
              height: '50px',
              borderRadius: '10px',

              color: '#ffffff',
              backgroundColor: 'gray',
              border: '1px solid #cfcfcf',
              fontSize: '14px',
              fontWeight: 600,
              padding: '5px',
              cursor: 'pointer',
            }}
          />
        </form>
      </div>
    </div>
  );
};
export default Login;
