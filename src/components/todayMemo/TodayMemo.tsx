import MemoForm from '../form/MemoForm';
import MemoList from '../list/MemoList';

interface IProps {
  targetDate: string;
}
const TodayMemo = ({ targetDate }: IProps) => {
  return (
    <div>
      <h3>MEMO</h3>
      <MemoForm targetDate={targetDate} />
      <MemoList targetDate={targetDate} />
    </div>
  );
};

export default TodayMemo;
