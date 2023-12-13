import dayjs from 'dayjs';
import TodayMemo from '../todayMemo/TodayMemo';
import TodayWork from '../todayWork/TodayWork';
import Button from '../button/Button';
import Header from '../header/Header';

const PanelRight = ({ targetDate }: { targetDate: string }) => {
  return (
    <div
      css={{
        backgroundColor: 'rgb(242, 242, 242)',
        flex: 1,
        width: '100%',
        // height: '100%',
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
          {`${dayjs(targetDate).get('year')}년 ${dayjs(targetDate).get('month') + 1}월 ${dayjs(
            targetDate,
          ).get('date')}일의 워크로그`}
        </div>
      </div>

      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
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
          <TodayWork />
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
