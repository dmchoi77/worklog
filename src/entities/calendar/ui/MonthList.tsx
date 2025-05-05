import { useState } from 'react';
import { List, ListItemButton, ListItemText, Collapse, ListItemIcon, Divider } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';
import { useFetchCalendarDays } from '../model';
import DayList from './DayList';

interface IMonthList {
  year: number;
  month: number;
}

export const MonthList = ({ year, month }: IMonthList) => {
  const [open, setOpen] = useState(false);

  const { data: days } = useFetchCalendarDays({ year, month }, open);

  return (
    <List component='div' disablePadding key={month}>
      <ListItemButton onClick={() => setOpen((prev) => !prev)}>
        <ListItemIcon sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FolderIcon sx={{ color: '#d1d1d1' }} />
        </ListItemIcon>
        <ListItemText
          primary={`${month}월`}
          primaryTypographyProps={{
            textAlign: 'left',
            pl: 3,
            fontSize: 16,
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        {days?.map((day) => <DayList day={day} month={month} year={year} key={day} />)}
      </Collapse>
      <Divider />
    </List>
  );
};
