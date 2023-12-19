import dayjs from 'dayjs';

import { resetServerContext } from 'react-beautiful-dnd';

import { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  // fix `data-rbd-draggable-context-id` did not match Server / Client
  resetServerContext();
  return {
    props: {},
  };
};
