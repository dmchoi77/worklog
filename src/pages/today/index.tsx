import { GetServerSideProps } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import dayjs, { locale, extend } from 'dayjs';

import { resetServerContext } from 'react-beautiful-dnd';

import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import PanelRightMobile from '~/components/mobile/PanelRightMobile';
import PanelRight from '~/components/panel/PanelRight';

import { fetchCalendarYears, fetchMemoList, fetchWorkList } from '~/apis';
import { calendarQueryKeys, memoQueryKeys, workQueryKeys } from '~/queries';
import { httpWithAuth } from '~/utils/http';

extend(utc);
extend(timezone);
locale('ko');
dayjs.tz.setDefault('Asia/Seoul');

const todayDate = dayjs().tz().format('YYYY-MM-DD');

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  httpWithAuth.defaults.headers.Authorization = `Bearer ${ctx.req.cookies.access_token}`;

  const userAgent = ctx.query.agent;

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: memoQueryKeys.fetchMemoList({ date: todayDate }).queryKey,
      queryFn: () => fetchMemoList({ date: todayDate }),
      initialData: [],
    }),
    queryClient.prefetchQuery({
      queryKey: workQueryKeys.fetchWorkList({ date: todayDate }).queryKey,
      queryFn: () => fetchWorkList({ date: todayDate }),
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
    props: {
      dehydratedState: dehydrate(queryClient),
      userAgent,
    },
  };
};

interface IProps {
  userAgent: 'desktop' | 'mobile';
}

const Today = ({ userAgent }: IProps) => {
  return (
    <div css={{ width: '100%' }}>
      {userAgent === 'mobile' && <PanelRightMobile targetDate={todayDate} userAgent={userAgent} />}
      {userAgent === 'desktop' && <PanelRight targetDate={todayDate} userAgent={userAgent} />}
    </div>
  );
};

export default Today;
