import dayjs from 'dayjs';
import DashboardRight from '~/pages/content/ui/DashboardRight';

type ContentPageProps = Promise<{ date: string[] }>;

const ContentPage = async ({ params }: { params: ContentPageProps }) => {
  const date = (await params).date;
  const targetDate = dayjs(date.join('-')).format('YYYY-MM-DD');

  return (
    <div className='w-full h-full'>
      <DashboardRight targetDate={targetDate} />
    </div>
  );
};

export default ContentPage;
