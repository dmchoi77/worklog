import { useEffect, useState } from 'react';

import type { IWork } from '~/types';

const useWork = (props: IWork) => {
  const [work, setWork] = useState<IWork>(props);

  const workSetter = (key: keyof IWork) => (value: any) => {
    setWork((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    setWork(props);
  }, [props]);

  return { work, workSetter };
};

export default useWork;
