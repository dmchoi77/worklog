import { ObjectSchema, object, ref, string } from 'yup';

export interface UserRegisterationForm {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
}

export const userRegistrationSchema: ObjectSchema<UserRegisterationForm> = object({
  email: string().email().required(),
  username: string().required(),
  password: string().required(),
  passwordCheck: string()
    .required()
    .oneOf([ref('password')]),
});
