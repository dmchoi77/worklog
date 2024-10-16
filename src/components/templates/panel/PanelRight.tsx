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
      <div className='today-container' css={{ display: 'flex', height: '80px', alignItems: 'center' }}>
        <div css={{ fontSize: 20, fontWeight: 600, padding: 20 }}>
          {`${date.get('year')}년 ${date.get('month') + 1}월 ${date.get('date')}일의 워크로그`}
        </div>
      </div>
      <div css={{ height: 'calc(100% - 80px)', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        <div className='today-task-container' css={{ flex: 0.5, padding: 20, borderRight: '1px solid #d5d5d552' }}>
          <TodayWork targetDate={targetDate} userAgent={userAgent} />
        </div>
        <div css={{ flex: 0.5, padding: 20, height: '100%' }}>
          <TodayMemo targetDate={targetDate} userAgent={userAgent} />
        </div>
      </div>
    </div>
  );
};

export default PanelRight;
