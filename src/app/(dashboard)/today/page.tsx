import 'dayjs/locale/ko';
import dayjs, { locale, extend } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import PanelRight from '~/components/templates/panel/PanelRight';

extend(utc);
extend(timezone);
locale('ko');
dayjs.tz.setDefault('Asia/Seoul');

const todayDate = dayjs().tz().format('YYYY-MM-DD');

const Today = () => <PanelRight targetDate={todayDate} />;

export default Today;
