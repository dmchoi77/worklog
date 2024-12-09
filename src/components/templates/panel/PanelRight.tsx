import dayjs from 'dayjs';

import TodayMemo from '~/components/organisms/todayMemo/TodayMemo';
import TodayWork from '~/components/organisms/todayWork/TodayWork';

import type { ICommonProps } from '~/types';

const PanelRight = ({ targetDate, userAgent }: ICommonProps) => {
  const isMobile = userAgent === 'mobile';
  const date = dayjs(targetDate);

  return (
    <div
      css={{
        backgroundColor: 'rgb(242, 242, 242)',
        flex: 1,
        width: '100%',
        padding: 0,
        height: 'calc(100vh - 50px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className='flex h-[80px] items-center p-[20px]'>
        <span className='text-[20px] font-semibold '>{`${date.get('year')}년 ${date.get('month') + 1}월 ${date.get('date')}일의 워크로그`}</span>
      </div>
      <div className='flex gap-x-[30px] h-[calc(100% - 80px)] p-[20px] '>
        <TodayWork targetDate={targetDate} userAgent={userAgent} />
        <TodayMemo targetDate={targetDate} userAgent={userAgent} />
      </div>
    </div>
  );
};

export default PanelRight;
