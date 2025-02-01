import dayjs from 'dayjs';
import Memo from './memo/Memo';
import Work from './work/Work';

const DashboardRight = ({ targetDate }: { targetDate: string }) => {
  const date = dayjs(targetDate);

  return (
    <div className='bg-[#F2F2F2] flex-1 w-full p-0 h-full flex flex-col'>
      <div className='flex h-[80px] items-center p-[20px]'>
        <span className='text-[20px] font-semibold '>{`${date.get('year')}년 ${date.get('month') + 1}월 ${date.get('date')}일의 워크로그`}</span>
      </div>
      <div className='flex gap-x-[30px] h-[calc(100vh-130px)] p-[20px]'>
        <div className='w-1/2'>
          <Work targetDate={targetDate} />
        </div>
        <div className='w-1/2'>
          <Memo targetDate={targetDate} />
        </div>
      </div>
    </div>
  );
};

export default DashboardRight;
