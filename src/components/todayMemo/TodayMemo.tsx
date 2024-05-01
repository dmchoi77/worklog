import { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';

import MemoForm from '../form/MemoForm';
import MemoList from '../list/MemoList';

import useMobile from '~/hooks/useMobile';

interface IProps {
  targetDate: string;
}
const TodayMemo = ({ targetDate }: IProps) => {
  const [openForm, setOpenForm] = useState(false);

  const mobile = useMobile();

  const toggleForm = () => {
    setOpenForm((prev) => !prev);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>MEMO</h3>
        {mobile ? openForm ? <ExpandLess onClick={toggleForm} /> : <ExpandMore onClick={toggleForm} /> : null}
      </div>
      {mobile ? openForm && <MemoForm targetDate={targetDate} /> : <MemoForm targetDate={targetDate} />}
      <MemoList targetDate={targetDate} />
    </div>
  );
};

export default TodayMemo;
