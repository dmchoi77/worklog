import Image from 'next/image';
import Logo from '../../../../public/assets/images/logo.png';

const LoginTitle = () => (
  <div className='py-[20px]'>
    <Image src={Logo.src} alt='logo' width={Logo.width} height={Logo.height} />
  </div>
);

export default LoginTitle;
