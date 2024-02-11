import { useRouter } from 'next/router';

import { useState } from 'react';

import { Paper, IconButton, InputBase } from '@mui/material';

import { Interpolation, Theme } from '@emotion/react';

import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ style }: { style?: Interpolation<Theme> }) => {
  const [key, setKey] = useState<string>('');

  const router = useRouter();

  const handleSearchButton = () => {
    if (!key) return;
    setKey('');
    router.push(`/search?key=${key}`);
  };
  return (
    <Paper
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
      <IconButton sx={{ p: '10px' }} aria-label='menu' />
      <InputBase
        sx={{ flex: 1 }}
        value={key}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleSearchButton();
        }}
        onChange={(event) => setKey(event.target.value)}
        placeholder='검색'
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={handleSearchButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
