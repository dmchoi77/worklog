import { GetServerSideProps } from 'next';

import { ParsedUrlQuery } from 'querystring';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import dayjs from 'dayjs';

import { resetServerContext } from 'react-beautiful-dnd';

import { fetchMemoList } from '~/apis/memo';
import PanelRight from '~/components/panel/PanelRight';
import { memoQueryKeys } from '~/queries/memo';
import http from '~/utils/http';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params as IParams;
  const [targetYear, targetMonth, targetDay] = slug;

  const targetDate = dayjs(`${targetYear}-${targetMonth}-${targetDay}`).format('YYYY-MM-DD');

  http.defaults.headers.Authorization = `Bearer ${ctx.req.cookies.access_token}`;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: memoQueryKeys.fetchMemoList({ startDate: targetDate, endDate: targetDate }).queryKey,
    queryFn: () => fetchMemoList({ startDate: targetDate, endDate: targetDate }),
  });
  // fix `data-rbd-draggable-context-id` did not match Server / Client
  resetServerContext();

  return {
    props: { targetDate: targetDate, dehydratedState: dehydrate(queryClient) },
  };
};

const Content = ({ targetDate }: { targetDate: string }) => {
  return (
    <div css={{ width: '100%', height: '100%' }}>
      <PanelRight targetDate={targetDate} />
    </div>
  );
};

export default Content;

interface IParams extends ParsedUrlQuery {
  slug: string[];
  targetDate: string;
}
