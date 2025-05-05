'use client';
import { List, ListSubheader } from '@mui/material';
import { useFetchCalendarYears } from '../model';
import { YearList } from './YearList';

export const DashboardLeftList = () => {
  const { data } = useFetchCalendarYears();

  if (!data) return <></>;

  return (
    <List
      className='bg-[#303030] text-[#F5F5F5] max-w-[360px] w-full'
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader style={{ backgroundColor: '#303030', color: '#F5F5F5' }} component='div'>
          Worklog
        </ListSubheader>
      }
    >
      {data.map((year) => (
        <YearList year={year} key={year} />
      ))}
    </List>
  );
};
