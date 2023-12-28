import { useRouter } from 'next/router';

import React, { useState } from 'react';

import { List, ListItemButton, ListItemText, Collapse, ListItemIcon, Divider } from '@mui/material';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';

import { useFetchCalendarDays, useFetchCalendarMonth } from '~/queries/calendar';
import { IFetchCalendarDaysRequest } from '~/types/apis/calendar.types';

const defaultListState = {
  year: false,
  month: false,
};

const defaultFilterState = {
  year: 0,
  month: 0,
};
type FilterType = IFetchCalendarDaysRequest;

const NestedList = ({ year }: { year: number }) => {
  const [openList, setOpenList] = useState(() => defaultListState);
  const [filter, updateFilter] = useState<FilterType>(() => defaultFilterState);

  const { data: months } = useFetchCalendarMonth(year);
  const { data: days } = useFetchCalendarDays(filter);

  const router = useRouter();

  const handleClickList = (key: 'year' | 'month', value?: number) => () => {
    if (key === 'month' && !!value) updateFilter({ year, month: value });

    setOpenList((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleClickDay =
    ({ year, month, day }: { year: number; month: number; day: number }) =>
    () => {
      router.push(`/content/${year}/${month}/${day}`);
    };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClickList('year')}>
        <ListItemIcon sx={{ display: 'flex' }}>
          <FolderIcon sx={{ color: '#d1d1d1' }} />
        </ListItemIcon>
        <ListItemText primary={`${year}년`} primaryTypographyProps={{ textAlign: 'left', pr: 1, fontSize: 16 }} />
        {openList.year ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={openList.year} timeout='auto' unmountOnExit>
        {months?.map((month) => (
          <List component='div' disablePadding key={month}>
            <ListItemButton onClick={handleClickList('month', month)}>
              <ListItemIcon sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FolderIcon sx={{ color: '#d1d1d1' }} />
              </ListItemIcon>
              <ListItemText
                primary={`${month}월`}
                primaryTypographyProps={{
                  textAlign: 'left',
                  pl: 3,
                  fontSize: 16,
                }}
              />
              {openList.month ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openList.month} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {days?.map((day) => (
                  <React.Fragment key={day}>
                    <ListItemButton sx={{ pl: 6 }} key={day} onClick={handleClickDay({ year, month, day })}>
                      <ListItemIcon sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
