import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { Box, AppBar, Toolbar, IconButton, Typography, Button, List, Drawer, ListSubheader } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import YearList from '../list/YearList';

import { useFetchCalendarYears, useLogout } from '~/queries';

const MobileAppBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setOpenDrawer(value);
  };

  const router = useRouter();

  const { mutate: handleLogout } = useLogout();
  const { data: years } = useFetchCalendarYears();

  const DrawerList = (
    <Box sx={{ width: 250 }}>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: '#303030', color: '#F5F5F5' }}
        component='nav'
        subheader={
          <ListSubheader
            component='div'
            id='nested-list-subheader'
            css={{
              backgroundColor: '#303030',
              color: '#F5F5F5',
              fontSize: 16,
            }}
          >
            worklog
          </ListSubheader>
        }
      >
        {years?.map((year) => <YearList year={year} key={year} />)}
      </List>
    </Box>
  );

  useEffect(
    function closeDrawerWithPageRoute() {
      if (!openDrawer) return;
      setOpenDrawer(false);
    },
    [router.asPath],
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ background: '#303030' }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='span' sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => router.push('/today')}>
            Today
          </Typography>
          <Button color='inherit' onClick={() => handleLogout()}>
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: '#303030',
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default MobileAppBar;
