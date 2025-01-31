import { PropsWithChildren } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { UserRegisterationForm, userRegistrationSchema } from '~/constants/user';

export const UserRegistrationFormProvider = ({ children }: PropsWithChildren) => {
  const method = useForm<UserRegisterationForm>({
    resolver: yupResolver(userRegistrationSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passwordCheck: '',
    },
  });

  return <FormProvider {...method}>{children}</FormProvider>;
};
