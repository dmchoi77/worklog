import { useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

const useMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [mobile, setMobile] = useState(isMobile);

  useEffect(() => {
    if (isMobile) setMobile(true);
    else setMobile(false);
  }, [isMobile]);

  return mobile;
};

export default useMobile;
