import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { IMenuListResponse } from '~/types/api.types';

const NestedList = ({ data }: { data: IMenuListResponse }) => {
  const [openYear, setOpenYear] = useState(true);
  const [openMonth, setOpenMonth] = useState(true);

  const handleClickYear = () => {
    setOpenYear(!openYear);
  };

  const handleClickMonth = () => {
    setOpenMonth(!openMonth);
  };

  const handleClickDay = (day: string) => () => {
    console.log('handleClickDay', day);
  };
  return (
    <React.Fragment>
      <ListItemButton onClick={handleClickYear}>
        {/* <ListItemIcon>추후 아이콘 추가</ListItemIcon> */}
        <ListItemText
          primary={`${data?.year}년`}
          primaryTypographyProps={{
            textAlign: 'left',
            pl: 2,
            fontWeight: 600,
          }}
        />
        {openYear ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openYear} timeout='auto' unmountOnExit>
        {data?.months?.map((month, index) => (
          <List component='div' disablePadding key={index}>
            <ListItemButton onClick={handleClickMonth}>
              <ListItemText
                primary={`${month?.month}월`}
                primaryTypographyProps={{
                  textAlign: 'right',
                  pr: 2,
                  fontWeight: 600,
                }}
              />
              {openMonth ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMonth} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {month.days.map((day, index) => (
                  <ListItemButton sx={{ pl: 4 }} key={index} onClick={handleClickDay(day)}>
                    <ListItemText
                      primary={`${day}일`}
                      primaryTypographyProps={{
                        textAlign: 'right',
                        fontWeight: 600,
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        ))}
      </Collapse>
    </React.Fragment>
  );
};

export default NestedList;
