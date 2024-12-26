import Image from 'next/image';
import logo from '/public/assets/images/logo.png';

const LoginTitle = () => (
  <div className='py-[20px]'>
    <Image src={logo.src} alt='logo' width={300} height={logo.height} />
  </div>
);

export default LoginTitle;
