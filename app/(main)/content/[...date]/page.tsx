import dayjs from 'dayjs';
import { ContentPage as ContentPageComponent } from '~/pages/content/ContentPage';

type ContentPageProps = Promise<{ date: string[] }>;

const ContentPage = async ({ params }: { params: ContentPageProps }) => {
  const date = (await params).date;
  const targetDate = dayjs(date.join('-')).format('YYYY-MM-DD');

  return (
    <div className='w-full h-full'>
      <ContentPageComponent targetDate={targetDate} />
    </div>
  );
};

export default ContentPage;
