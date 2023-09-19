import NestedList from '../list/NestedList';
import data from '../../../app.json';
import { ICommonAPIResponse, IMenuListResponse } from '~/types/api.types';
import { Divider, IconButton, InputBase, List, ListSubheader, Paper } from '@mui/material';
import SearchInput from '../input/SearchInput';

const PanelLeft = () => {
  const result: ICommonAPIResponse<IMenuListResponse[]> = data;
  return (
    <div
      css={{
        backgroundColor: '#c8c8c81d',
        borderRight: '1px solid #d5d5d552',
        flex: 0.2,
        minWidth: '200px',
        maxWidth: '200px',
      }}
    >
      <SearchInput />
      <Divider/>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
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
