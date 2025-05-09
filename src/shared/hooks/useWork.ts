import { useState } from 'react';
import { Work } from '~/entities/work/api';

const useWork = (props: Work) => {
  const [work, setWork] = useState<Work>(props);

  const workSetter = (key: keyof Work) => (value: unknown) => {
    setWork((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return { work, workSetter };
};

export default useWork;
