import { PropsWithChildren } from 'react';

export const NonAuthLayout = ({ children }: PropsWithChildren) => (
  <div className='flex flex-col w-full h-[100vh] justify-center items-center'>{children}</div>
);
