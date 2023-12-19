import { GetServerSideProps } from 'next';

import dayjs from 'dayjs';

import { resetServerContext } from 'react-beautiful-dnd';

import PanelRight from '~/components/panel/PanelRight';

const todayDate = dayjs().format('YYYY-MM-DD');

export const getServerSideProps: GetServerSideProps = async (context) => {
  // fix `data-rbd-draggable-context-id` did not match Server / Client
  resetServerContext();
  return {
    props: {},
  };
};

const Today = () => {
  return (
    <div css={{ width: '100%' }}>
      <PanelRight targetDate={todayDate} />
    </div>
  );
};

export default Today;
