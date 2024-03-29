import dayjs from 'dayjs';

import Button from '../button/Button';
import Header from '../header/Header';
import TodayMemo from '../todayMemo/TodayMemo';
import TodayWork from '../todayWork/TodayWork';

const PanelRight = ({ targetDate }: { targetDate: string }) => {
  return (
    <div
      css={{
        backgroundColor: 'rgb(242, 242, 242)',
        flex: 1,
        width: '100%',
        overflowY: 'scroll',

        height: 'calc(100vh - 50px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* <Header /> */}
      <div
        className='today-container'
        css={{
          display: 'flex',
          height: '80px',
          alignItems: 'center',
        }}
      >
        <div
          css={{
            fontSize: 20,
            fontWeight: 600,
            padding: 20,
          }}
        >
          {`${dayjs(targetDate).get('year')}년 ${dayjs(targetDate).get('month') + 1}월 ${dayjs(targetDate).get(
            'date',
          )}일의 워크로그`}
        </div>
      </div>

      <div
        css={{
          display: 'flex',
          flexDirection: 'row',

          '@media (max-width: 640px)': {
            flexDirection: 'column',
          },
        }}
      >
        <div
          className='today-task-container'
          css={{
            flex: 0.5,
            padding: 20,
            borderRight: '1px solid #d5d5d552',
          }}
        >
          <TodayWork targetDate={targetDate} />
        </div>
        <div
          css={{
            flex: 0.5,
            padding: 20,
            height: '100%',
          }}
        >
          <TodayMemo targetDate={targetDate} />
        </div>
      </div>
    </div>
  );
};

export default PanelRight;
