import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ICommonResponse } from '~/types/apis/common.types';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const response = await axios.post<ICommonResponse<{ token: string }>>(
      '/users/login',
      {
        username: req.body.username,
        password: req.body.password,
      },
      {
        baseURL,
      },
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    // console.log("🚀 ~ file: login.ts:21 ~ handler ~ error:", error)
    return res.status(error.response.data.status).json(error.response.data);
  }
}
