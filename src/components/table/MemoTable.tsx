import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';

import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { StyledTableCell } from './table.style';

import { RoutePath } from '~/constants/route';
import { useSearchMemoList } from '~/queries/memo';

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
          <StyledTableCell sx={{ width: '20%', padding: '5px', fontSize: '12px' }} align='center'>
            날짜
          </StyledTableCell>
          <StyledTableCell sx={{ width: '80%', padding: '5px', fontSize: '12px' }} align='center'>
            내용
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {memoList.content.length > 0 ? (
          <>
            {memoList.content.map((memo) => (
              <TableRow key={memo.id} onClick={() => handleClickRow(memo.date)} sx={{ cursor: 'pointer' }}>
                <StyledTableCell align='center'>{memo.date}</StyledTableCell>
                <StyledTableCell align='center' sx={{ padding: '5px' }}>
                  {memo.content}
                </StyledTableCell>
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
