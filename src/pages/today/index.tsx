import dayjs from 'dayjs';

import PanelRight from '~/components/panel/PanelRight';

const todayDate = dayjs().format('YYYY-MM-DD');

const Today = () => {
  return (
    <div css={{ width: '100%' }}>
      <PanelRight targetDate={todayDate} />
    </div>
  );
};

export default Today;
