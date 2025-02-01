import { useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

const useMobile = () => {
  const [mobile, setMobile] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    if (isMobile) setMobile(true);
    else setMobile(false);
  }, [isMobile]);

  return mobile;
};

export default useMobile;
