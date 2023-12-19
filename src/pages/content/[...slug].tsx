import { ParsedUrlQuery } from 'querystring';

import dayjs from 'dayjs';

import { resetServerContext } from 'react-beautiful-dnd';

import { GetServerSideProps } from 'next';

import PanelRight from '~/components/panel/PanelRight';

const Content = ({ targetDate }: IParams) => {
  return (
    <div css={{ width: '100%', height: '100%' }}>
      <PanelRight targetDate={targetDate} />
    </div>
  );
};

export default Content;

interface IParams extends ParsedUrlQuery {
  slug?: string;
  targetDate: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;
  const targetYear = slug?.[0];
  const targetMonth = slug?.[1];
  const targetDay = slug?.[2];

  const targetDate = dayjs(`${targetYear}-${targetMonth}-${targetDay}`).format('YYYY-MM-DD');

  // fix `data-rbd-draggable-context-id` did not match Server / Client
  resetServerContext();

  return {
    props: { targetDate: targetDate },
  };
};
