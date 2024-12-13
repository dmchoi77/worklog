import dayjs from 'dayjs';
import PanelRight from '~/components/templates/panel/PanelRight';

interface ContentPageProps {
  params: {
    date: string[];
  };
}
const ContentPage = ({ params: { date } }: ContentPageProps) => {
  const targetDate = dayjs(date.join('-')).format('YYYY-MM-DD');

  return (
    <div className='w-full'>
      <PanelRight targetDate={targetDate} />
    </div>
  );
};

export default ContentPage;
