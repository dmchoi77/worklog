import { GetServerSideProps } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import dayjs, { locale, extend } from 'dayjs';

import { resetServerContext } from 'react-beautiful-dnd';

import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { fetchMemoList } from '~/apis/memo';
import PanelRight from '~/components/panel/PanelRight';
import { memoQueryKeys } from '~/queries/memo';
import http from '~/utils/http';

extend(utc);
extend(timezone);
locale('ko');
dayjs.tz.setDefault('Asia/Seoul');

const todayDate = dayjs().tz().format('YYYY-MM-DD');

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  http.defaults.headers.Authorization = `Bearer ${ctx.req.cookies.access_token}`;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: memoQueryKeys.fetchMemoList({ startDate: todayDate, endDate: todayDate }).queryKey,
    queryFn: () => fetchMemoList({ startDate: todayDate, endDate: todayDate }),
  });
  // fix `data-rbd-draggable-context-id` did not match Server / Client
  resetServerContext();
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
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
