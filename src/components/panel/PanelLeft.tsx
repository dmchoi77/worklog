import NestedList from '../list/NestedList';
import data from '../../../app.json';
import { ICommonAPIResponse, IMenuListResponse } from '~/types/api.types';
import { Divider, List, ListSubheader } from '@mui/material';
import SearchInput from '../input/SearchInput';

const PanelLeft = () => {
  const result: ICommonAPIResponse<IMenuListResponse[]> = data;
  return (
    <div
      css={{
        backgroundColor: '#303030',
        borderRight: '1px solid #d5d5d552',
        flex: 0.2,
        minWidth: '200px',
        maxWidth: '200px',
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
        {result.data.map((data, index) => (
          <NestedList data={data} key={index} />
        ))}
      </List>
    </div>
  );
};

export default PanelLeft;
