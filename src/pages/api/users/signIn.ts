import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { ICommonResponse } from '~/types/apis/common.types';
import { ISignInRequest } from '~/types/apis/user.types';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const response = await axios.post<ISignInRequest, ICommonResponse>(
      '/users',
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordCheck: req.body.passwordCheck,
      },
      {
        baseURL,
      },
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    // console.log('🚀 ~ file: signIn.ts:24 ~ handler ~ error:', error);
    return res.status(error.response.status).json(error.response.data);
  }
}
