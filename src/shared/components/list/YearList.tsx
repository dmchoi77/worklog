'use client';
import React, { useState } from 'react';
import { ListItemButton, ListItemText, Collapse, ListItemIcon, Divider } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FolderIcon from '@mui/icons-material/Folder';
import MonthList from './MonthList';
import { useFetchCalendarMonth } from '~/pages/content/api/calendar/queries';

const YearList = ({ year }: { year: number }) => {
  const [open, setOpen] = useState(false);

  const { data: months } = useFetchCalendarMonth(year);

  return (
    <React.Fragment>
      <ListItemButton onClick={() => setOpen((prev) => !prev)}>
        <ListItemIcon sx={{ display: 'flex' }}>
          <FolderIcon sx={{ color: '#d1d1d1' }} />
        </ListItemIcon>
        <ListItemText primary={`${year}년`} primaryTypographyProps={{ textAlign: 'left', pr: 1, fontSize: 16 }} />
        <Expand open={open} />
      </ListItemButton>
      <Divider />
      <Collapse in={open} timeout='auto' unmountOnExit>
        {months?.map((month) => <MonthList year={year} month={month} key={month} />)}
      </Collapse>
    </React.Fragment>
  );
};

export default YearList;

const Expand = ({ open }: { open: boolean }) => <>{open ? <ExpandLess /> : <ExpandMore />}</>;
