import { GetServerSideProps } from 'next';

import { ParsedUrlQuery } from 'querystring';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import dayjs from 'dayjs';

import { resetServerContext } from 'react-beautiful-dnd';

import PanelRight from '~/components/organisms/panel/PanelRight';
import { calendarQueryKeys } from '~/queries/calendar';
import { memoQueryKeys } from '~/queries/memo';
import { workQueryKeys } from '~/queries/work';
import { httpWithAuth } from '~/utils/http';

import { fetchCalendarYears, fetchWorkList, fetchMemoList } from '~/apis';
import type { ICommonProps } from '~/types';

interface IParams extends ParsedUrlQuery {
  id: string[];
  targetDate: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as IParams;

  const [targetYear, targetMonth, targetDay] = id;
  const targetDate = dayjs(`${targetYear}-${targetMonth}-${targetDay}`).format('YYYY-MM-DD');

  const userAgent = ctx.query.agent;

  httpWithAuth.defaults.headers.Authorization = `Bearer ${ctx.req.cookies.access_token}`;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: memoQueryKeys.fetchMemoList({ date: targetDate }).queryKey,
      queryFn: () => fetchMemoList({ date: targetDate }),
      initialData: [],
    }),
    queryClient.prefetchQuery({
      queryKey: workQueryKeys.fetchWorkList({ date: targetDate }).queryKey,
      queryFn: () => fetchWorkList({ date: targetDate }),
    }),
    queryClient.prefetchQuery({
      queryKey: calendarQueryKeys.fetchCalendarYears.queryKey,
      queryFn: () => fetchCalendarYears(),
      initialData: [],
    }),
  ]);
  // fix `data-rbd-draggable-context-id` did not match Server / Client
  resetServerContext();

  return {
    props: { targetDate: targetDate, dehydratedState: dehydrate(queryClient), userAgent },
  };
};

const Content = ({ targetDate, userAgent }: ICommonProps) => (
  <div css={{ width: '100%' }}>
    <PanelRight targetDate={targetDate} userAgent={userAgent} />
  </div>
);

export default Content;
