import { TableCell, styled, tableCellClasses } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
  padding: '10px',
  whiteSpace: 'nowrap',
  wordBreak: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
