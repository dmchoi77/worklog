import React, { useState } from 'react';

import { List, ListItemButton, ListItemText, Collapse, ListItemIcon, Divider } from '@mui/material';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';
import { useRouter } from 'next/router';

import { IMenuListResponse } from '~/types/api.types';

const NestedList = ({ data }: { data: IMenuListResponse }) => {
  const [openYear, setOpenYear] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);

  const router = useRouter();
  const handleClickYear = () => {
    setOpenYear(!openYear);
  };

  const handleClickMonth = () => {
    setOpenMonth(!openMonth);
  };

  const handleClickDay =
    ({ year, month, day }: { year: string; month: string; day: string }) =>
    () => {
      console.log('handleClickDay', year, month, day);
      router.push(`/content/${year}/${month}/${day}`);
    };
  return (
    <React.Fragment>
      <ListItemButton onClick={handleClickYear}>
        <ListItemIcon
          sx={{
            display: 'flex',
          }}
        >
          <FolderIcon sx={{ color: '#d1d1d1' }} />
        </ListItemIcon>
        <ListItemText
          primary={`${data?.year}년`}
          primaryTypographyProps={{
            textAlign: 'left',
            pr: 1,
            fontSize: 16,
          }}
        />
        {openYear ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={openYear} timeout='auto' unmountOnExit>
        {data?.months?.map((month, index) => (
          <List component='div' disablePadding key={index}>
            <ListItemButton onClick={handleClickMonth}>
              <ListItemIcon
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <FolderIcon sx={{ color: '#d1d1d1' }} />
              </ListItemIcon>
              <ListItemText
                primary={`${month?.month}월`}
                primaryTypographyProps={{
                  textAlign: 'left',
                  pl: 3,
                  fontSize: 16,
                }}
              />
              {openMonth ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMonth} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {month.days.map((day, index) => (
                  <React.Fragment key={index}>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      key={index}
                      onClick={handleClickDay({
                        year: data?.year,
                        month: month.month,
                        day,
                      })}
                    >
                      <ListItemIcon
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <ArticleIcon sx={{ color: '#d1d1d1' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${day}일`}
                        primaryTypographyProps={{
                          textAlign: 'left',
                          fontSize: 15,
                          paddingLeft: 2,
                        }}
                      />
                    </ListItemButton>
                    <Divider variant='inset' />
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
            <Divider />
          </List>
        ))}
      </Collapse>
    </React.Fragment>
  );
};

export default NestedList;
