import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';

import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { StyledTableCell } from './table.style';

import { useSearchMemoList } from '~/queries/memo';

import { RoutePath } from '~/constants';

interface IProps {
  searchKey: string;
}

const MemoTable = ({ searchKey }: IProps) => {
  const { data: memoList, isLoading: isLoadingSearchMemoList } = useSearchMemoList(searchKey);

  const router = useRouter();

  const handleClickRow = (date: string) => {
    const formattedDate = dayjs(date).format('YYYY/MM/DD');
    router.push(`${RoutePath.Content}/${formattedDate}`);
  };

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ height: '32px', fontSize: '10px' }}>
          <StyledTableCell sx={{ width: '5%' }} align='center'>
            번호
          </StyledTableCell>
          <StyledTableCell sx={{ width: '15%' }} align='center'>
            날짜
          </StyledTableCell>
          <StyledTableCell sx={{ width: '80%' }} align='center'>
            내용
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {memoList.content.length > 0 ? (
          <>
            {memoList.content.map((memo, index) => (
              <TableRow key={memo.id} onClick={() => handleClickRow(memo.date)} sx={{ cursor: 'pointer' }}>
                <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                <StyledTableCell align='center'>{memo.date}</StyledTableCell>
                <StyledTableCell align='center'>{memo.content}</StyledTableCell>
              </TableRow>
            ))}
          </>
        ) : (
          <TableRow
            css={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <StyledTableCell align='center' colSpan={10}>
              조회된 데이터가 없습니다.
            </StyledTableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MemoTable;
