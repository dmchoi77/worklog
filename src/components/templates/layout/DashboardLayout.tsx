import { PropsWithChildren } from 'react';
import DashboardLeft from '../dashboard/DashboardLeft';
import CustomSnackbar from '~/shared/components/snackbar/Snackbar';
import Header from '~/components/organisms/header/Header';

export const DashboardLayout = ({ children }: PropsWithChildren) => (
  <div className='w-full flex flex-col justify-start items-center m-0 p-0'>
    <div className='flex w-full h-screen'>
      <DashboardLeft />
      <div className='flex flex-col w-full'>
        <div>
          <Header />
        </div>
        {children}
      </div>
    </div>
    <CustomSnackbar />
  </div>
);
