import { GetServerSideProps } from 'next';

import { ParsedUrlQuery } from 'querystring';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import dayjs from 'dayjs';

import { resetServerContext } from 'react-beautiful-dnd';

import { fetchCalendarYears } from '~/apis/calendar';
import { fetchMemoList } from '~/apis/memo';
import { fetchWorkList } from '~/apis/work';
import PanelRight from '~/components/panel/PanelRight';
import { calendarQueryKeys } from '~/queries/calendar';
import { memoQueryKeys } from '~/queries/memo';
import { workQueryKeys } from '~/queries/work';
import { ICommonProps } from '~/types/components/component.types';
import http from '~/utils/http';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params as IParams;
  const [targetYear, targetMonth, targetDay] = slug;

  const targetDate = dayjs(`${targetYear}-${targetMonth}-${targetDay}`).format('YYYY-MM-DD');

  const userAgent = ctx.query.agent;

  http.defaults.headers.Authorization = `Bearer ${ctx.req.cookies.access_token}`;

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

const Content = ({ targetDate, userAgent }: ICommonProps) => {
  return (
    <div css={{ width: '100%' }}>
      <PanelRight targetDate={targetDate} userAgent={userAgent} />
    </div>
  );
};

export default Content;

interface IParams extends ParsedUrlQuery {
  slug: string[];
  targetDate: string;
}
