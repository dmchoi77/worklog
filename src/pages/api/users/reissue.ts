import { NextApiRequest, NextApiResponse } from 'next';
import { ICommonResponse } from '~/types/apis/common.types';
import { ILoginResponse } from '~/types/apis/user.types';
import { getCookie } from '~/utils/cookie';
import http from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const response = await http.post<ICommonResponse<ILoginResponse>>('/users/reissue', null, {
      headers: {
        Refresh: typeof window !== 'undefined' ? getCookie('refreshAccessToken') : null,
      },
      baseURL,
    });

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.log('🚀 ~ file: login.ts:21 ~ handler ~ error:', error);
    return res.status(error.response?.data.status).json(error.response?.data);
  }
}
