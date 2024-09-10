import { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';

import MemoForm from '../../molecules/form/MemoForm';
import { TodayInnerLayout } from '../../templates/layout/TodayInnerLayout';
import MemoList from '../../molecules/list/MemoList';

import type { ICommonProps } from '~/types';

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
