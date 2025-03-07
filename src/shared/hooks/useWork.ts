import { useEffect, useState } from 'react';
import { Work } from '~/pages/content/model';

const useWork = (props: Work) => {
  const [work, setWork] = useState<Work>(props);

  const workSetter = (key: keyof Work) => (value: unknown) => {
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
