import dayjs from 'dayjs';
import TodayMemo from '../todayMemo/TodayMemo';
import TodayTask from '../todayTask/TodayTask';
import Button from '../button/Button';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const today = dayjs().format('YYYY년 MM월 DD일');

const PanelRight = ({ slug }: { slug?: string }) => {
  const [input, setInput] = useState('');
  const targetYear = slug?.[0];
  const targetMonth = slug?.[1];
  const targetDay = slug?.[2];

  const pathname = usePathname();

  const handleInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => setInput(value);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {};

  return (
    <div
      css={{
        backgroundColor: '#FFFDFA',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
          {pathname === '/today' ? today : `${targetYear}년 ${targetMonth}월 ${targetDay}일`}
        </div>
      </div>
      <div
        className='input-container'
        css={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '20px',
          height: '250px',
          width: '500px',
          gap: 10,
        }}
      >
        <textarea
          value={input}
          onChange={handleInput}
          style={{
            width: '100%',
            height: '100px',
            fontSize: '20px',
            resize: 'none',
            padding: 10,
            borderRadius: 10,
          }}
        />
        <div
          css={{
            display: 'flex',
            gap: 10,
          }}
        >
          <Button text='Task' onClick={handleSubmit} />
          <Button text='Memo' onClick={handleSubmit} />
        </div>
      </div>
      <div
        css={{
          display: 'flex',
          height: '100%',
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
          <TodayTask />
        </div>
        <div
          css={{
            flex: 0.5,
            padding: 20,
          }}
        >
          <TodayMemo />
        </div>
      </div>
    </div>
  );
};

export default PanelRight;
