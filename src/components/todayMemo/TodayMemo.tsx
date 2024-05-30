import { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';

import MemoForm from '../form/MemoForm';
import TodayInnerLayout from '../layout/TodayInnerLayout';
import MemoList from '../list/MemoList';

import { ICommonProps } from '~/types/components/component.types';

const TodayMemo = ({ targetDate, userAgent }: ICommonProps) => {
  const [openForm, setOpenForm] = useState(false);

  const isMobile = userAgent === 'mobile';

  const toggleForm = () => {
    setOpenForm((prev) => !prev);
  };

  return (
    <TodayInnerLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>MEMO</h3>
        {isMobile ? openForm ? <ExpandLess onClick={toggleForm} /> : <ExpandMore onClick={toggleForm} /> : null}
      </div>
      {isMobile ? openForm && <MemoForm targetDate={targetDate} /> : <MemoForm targetDate={targetDate} />}
      <MemoList targetDate={targetDate} />
    </TodayInnerLayout>
  );
};

export default TodayMemo;
