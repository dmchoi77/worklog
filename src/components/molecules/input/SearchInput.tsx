'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from './Input';

const SearchInput = () => {
  const [key, setKey] = useState<string>('');

  const router = useRouter();

  const handleSearchButton = () => {
    if (!key) return;
    setKey('');
    router.push(`/search?key=${key}`);
  };

  return (
    <Paper>
      <Input
        disabled
        value={key}
        placeholder='검색'
        LeftIcon={<SearchIcon />}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleSearchButton();
        }}
        onChange={(event) => setKey(event.target.value)}
      />
    </Paper>
  );
};

export default SearchInput;
