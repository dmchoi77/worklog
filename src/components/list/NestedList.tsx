import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
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
        {/* <ListItemIcon>추후 아이콘 추가</ListItemIcon> */}
        <ListItemText
          primary={`${data?.year}년`}
          primaryTypographyProps={{
            textAlign: 'right',
            pr: 6,
            fontWeight: 600,
            fontSize: 20,
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
                  fontSize: 18,
                }}
              />
              {openMonth ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMonth} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {month.days.map((day, index) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={index}
                    onClick={handleClickDay({
                      year: data?.year,
                      month: month.month,
                      day,
                    })}
                  >
                    <ListItemText
                      primary={`${day}일`}
                      primaryTypographyProps={{
                        textAlign: 'right',
                        fontWeight: 600,
                        fontSize: 16,
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
