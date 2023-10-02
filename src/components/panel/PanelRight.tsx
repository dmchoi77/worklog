import dayjs from 'dayjs';
import TodayMemo from '../todayMemo/TodayMemo';
import TodayWork from '../todayWork/TodayWork';
import Button from '../button/Button';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '../header/Header';

const today = dayjs().format('YYYY년 MM월 DD일');

const PanelRight = ({ slug }: { slug?: string }) => {
  const targetYear = slug?.[0];
  const targetMonth = slug?.[1];
  const targetDay = slug?.[2];

  const pathname = usePathname();

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
          {pathname === '/today'
            ? today
            : `${targetYear}년 ${targetMonth}월 ${targetDay}일의 워크 로그`}
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
          <TodayMemo />
        </div>
      </div>
    </div>
  );
};

export default PanelRight;
