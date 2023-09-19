import { Paper, IconButton, InputBase, Interpolation, Theme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ style }: { style?: Interpolation<Theme> }) => {
  return (
    <Paper
      component='form'
      css={[
        {
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fffdfa',
          boxShadow: 'none',
        },
        style,
      ]}
    >
      <IconButton sx={{ p: '10px' }} aria-label='menu'></IconButton>
      <InputBase sx={{ flex: 1 }} placeholder='검색' inputProps={{ 'aria-label': 'search' }} />
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
