import dayjs from 'dayjs';
import TodayMemo from '~/components/organisms/todayMemo/TodayMemo';
import TodayWork from '~/components/organisms/todayWork/TodayWork';
import type { ICommonProps } from '~/types';

const PanelRight = ({ targetDate }: ICommonProps) => {
  const date = dayjs(targetDate);

  return (
    <div className='bg-[#F2F2F2] flex-1 w-full p-0 h-full flex flex-col'>
      <div className='flex h-[80px] items-center p-[20px]'>
        <span className='text-[20px] font-semibold '>{`${date.get('year')}년 ${date.get('month') + 1}월 ${date.get('date')}일의 워크로그`}</span>
      </div>
      <div className='flex gap-x-[30px] h-[calc(100% - 80px)] p-[20px]'>
        <div className='w-1/2'>
          <TodayWork targetDate={targetDate} />
        </div>
        <div className='w-1/2'>
          <TodayMemo targetDate={targetDate} />
        </div>
      </div>
    </div>
  );
};

export default PanelRight;
