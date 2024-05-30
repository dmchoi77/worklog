import { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';

import WorkForm from '../form/WorkForm';
import TodayInnerLayout from '../layout/TodayInnerLayout';

import WorkList from '~/components/list/WorkList';
import { ICommonProps } from '~/types/components/component.types';

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
