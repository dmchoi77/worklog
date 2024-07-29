import { useController, useFormContext } from 'react-hook-form';
import { LoginPayload } from '~/types';

export const useLoginController = <T extends keyof LoginPayload>(name: T) => {
  const { control } = useFormContext<LoginPayload>();
  const methods = useController({ control, name });

  return methods;
};
