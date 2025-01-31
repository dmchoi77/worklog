import { getAccessToken } from './token';
/**
 * 서버 컴포넌트에서 사용할 fetch api
 */
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchRSC = async (endpoint: string, options?: RequestInit) => {
  const { data } = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((res) => res.json());

  return data;
};
