'use client';
import { List, ListSubheader } from '@mui/material';
import YearList from '~/components/molecules/list/YearList';
import { useFetchCalendarYears } from '~/queries/calendar';

export const DashboardLeftList = () => {
  const { data: years } = useFetchCalendarYears();

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
      {years?.map((year) => <YearList year={year} key={year} />)}
    </List>
  );
};