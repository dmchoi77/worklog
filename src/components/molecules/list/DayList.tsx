import { useRouter } from 'next/router';

import { List, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material';

import ArticleIcon from '@mui/icons-material/Article';

interface IDayList {
  year: number;
  month: number;
  day: number;
}

const DayList = ({ day, month, year }: IDayList) => {
  const router = useRouter();

  const handleClickDay =
    ({ year, month, day }: { year: number; month: number; day: number }) =>
    () => {
      router.push(`/content/${year}/${month}/${day}`);
    };

  return (
    <List component='div' disablePadding key={day}>
      <ListItemButton sx={{ pl: 6 }} key={day} onClick={handleClickDay({ day, month, year })}>
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
    </List>
  );
};

export default DayList;
