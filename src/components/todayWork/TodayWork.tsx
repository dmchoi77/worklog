import { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';

import WorkForm from '../form/WorkForm';

import WorkList from '~/components/list/WorkList';
import useMobile from '~/hooks/useMobile';

interface IProps {
  targetDate: string;
}

const TodayWork = ({ targetDate }: IProps) => {
  const [openForm, setOpenForm] = useState(false);

  const mobile = useMobile();

  const toggleForm = () => {
    setOpenForm((prev) => !prev);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>WORK</h3>
        {mobile ? openForm ? <ExpandLess onClick={toggleForm} /> : <ExpandMore onClick={toggleForm} /> : null}
      </div>
      {mobile ? openForm && <WorkForm targetDate={targetDate} /> : <WorkForm targetDate={targetDate} />}
      <WorkList targetDate={targetDate} />
    </div>
  );
};

export default TodayWork;
