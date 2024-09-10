import { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { TodayInnerLayout } from '../../templates/layout/TodayInnerLayout';
import WorkForm from '../../molecules/form/WorkForm';

import WorkList from '~/components/molecules/list/WorkList';

import type { ICommonProps } from '~/types';

const TodayWork = ({ targetDate, userAgent }: ICommonProps) => {
  const [openForm, setOpenForm] = useState(false);

  const isMobile = userAgent === 'mobile';

  const toggleForm = () => {
    setOpenForm((prev) => !prev);
  };

  return (
    <TodayInnerLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>WORK</h3>
        {isMobile ? openForm ? <ExpandLess onClick={toggleForm} /> : <ExpandMore onClick={toggleForm} /> : null}
      </div>
      {isMobile ? openForm && <WorkForm targetDate={targetDate} /> : <WorkForm targetDate={targetDate} />}
      <WorkList targetDate={targetDate} />
    </TodayInnerLayout>
  );
};

export default TodayWork;
