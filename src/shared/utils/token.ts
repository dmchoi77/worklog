import { cookies } from 'next/headers';
import { AccessToken } from '~/constants';

export const getAccessToken = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(AccessToken)?.value;
  return accessToken;
};
