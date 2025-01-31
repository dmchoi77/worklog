import 'dayjs/locale/ko';
import dayjs, { locale, extend } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import DashboardRight from '~/components/templates/dashboard/DashboardRight';

extend(utc);
extend(timezone);
locale('ko');
dayjs.tz.setDefault('Asia/Seoul');

const todayDate = dayjs().tz().format('YYYY-MM-DD');

const Today = () => <DashboardRight targetDate={todayDate} />;

export default Today;
