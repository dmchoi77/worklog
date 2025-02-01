import axios from 'axios';

export const reissue = async (): Promise<{ accessToken: string; refreshToken: string }> => {
  const { data } = await axios.post('/api/reissue');

  return data;
};

export const logout = async () => {
  const { data } = await axios.post('/api/logout');
  return data;
};
