import { Divider, List, ListSubheader } from '@mui/material';

import SearchInput from '../../molecules/input/SearchInput';
import YearList from '../../molecules/list/YearList';

import { useFetchCalendarYears } from '~/queries/calendar';

const PanelLeft = () => {
  const { data: years } = useFetchCalendarYears();

  return (
    <div
      css={{
        backgroundColor: '#303030',
        borderRight: '1px solid #d5d5d552',
        minWidth: '200px',
        maxWidth: '200px',

        '@media (max-width: 640px)': {
          display: 'none',
        },
      }}
    >
      <div
        css={{
          display: 'flex',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          css={{
            color: '#F5F5F5',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          오늘의 워크로그
        </span>
      </div>
      <SearchInput />
      <Divider />
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
            worklog
          </ListSubheader>
        }
      >
        {years?.map((year) => <YearList year={year} key={year} />)}
      </List>
    </div>
  );
};

export default PanelLeft;
