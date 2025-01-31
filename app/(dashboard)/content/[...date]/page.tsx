import dayjs from 'dayjs';
import DashboardRight from '~/components/templates/dashboard/DashboardRight';

interface ContentPageProps {
  params: {
    date: string[];
  };
}
const ContentPage = ({ params: { date } }: ContentPageProps) => {
  const targetDate = dayjs(date.join('-')).format('YYYY-MM-DD');

  return (
    <div className='w-full h-full'>
      <DashboardRight targetDate={targetDate} />
    </div>
  );
};

export default ContentPage;
