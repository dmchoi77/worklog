import { List, ListSubheader } from '@mui/material';

import YearList from '../../molecules/list/YearList';

import { useFetchCalendarYears } from '~/queries/calendar';

export const PanelLeftList = () => {
  const { data: years } = useFetchCalendarYears();

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: '#303030', color: '#F5F5F5' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader
          component='div'
          id='nested-list-subheader'
          css={{
            backgroundColor: '#303030',
            color: '#F5F5F5',
          }}
        >
          Worklog
        </ListSubheader>
      }
    >
      {years?.map((year) => <YearList year={year} key={year} />)}
    </List>
  );
};
