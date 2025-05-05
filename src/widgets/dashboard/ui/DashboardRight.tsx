import dayjs from 'dayjs';
import { MemoForm, MemoListWithData } from '~/features/memo/ui';
import { WorkForm, WorkListWithData } from '~/features/work/ui';
import { InnerLayout } from '~/shared/ui/layout/InnerLayout';

export const DashboardRight = ({ targetDate }: { targetDate: string }) => {
  const date = dayjs(targetDate);

  return (
    <div className='bg-[#F2F2F2] flex-1 w-full p-0 h-full flex flex-col'>
      <div className='flex h-[80px] items-center p-[20px]'>
        <span className='text-[20px] font-semibold '>{`${date.get('year')}년 ${date.get('month') + 1}월 ${date.get('date')}일의 워크로그`}</span>
      </div>
      <div className='flex gap-x-[30px] h-[calc(100vh-130px)] p-[20px]'>
        <div className='w-1/2'>
          <InnerLayout>
            <h3 className='font-[600]'>Work</h3>
            <WorkForm targetDate={targetDate} />
            <WorkListWithData targetDate={targetDate} />
          </InnerLayout>
        </div>
        <div className='w-1/2'>
          <InnerLayout>
            <h3 className='font-[600]'>MEMO</h3>
            <MemoForm targetDate={targetDate} />
            <MemoListWithData targetDate={targetDate} />
          </InnerLayout>
        </div>
      </div>
    </div>
  );
};
