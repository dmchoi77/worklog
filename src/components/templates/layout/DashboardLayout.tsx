import { PropsWithChildren } from 'react';
import CustomSnackbar from '~/components/molecules/snackbar/Snackbar';
import Header from '~/components/organisms/header/Header';
import PanelLeft from '../panel/PanelLeft';

export const DashboardLayout = ({ children }: PropsWithChildren) => (
  <div className='w-full flex flex-col justify-start items-center m-0 p-0'>
    <div className='flex w-full h-screen'>
      <PanelLeft />
      <div className='flex flex-col w-full'>
        <Header />
        {children}
      </div>
    </div>
    <CustomSnackbar />
  </div>
);
