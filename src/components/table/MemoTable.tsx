import { useRouter } from 'next/navigation';

import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { StyledTableCell } from './table.style';

import { useSearchMemoList } from '~/queries/memo';

interface IProps {
  searchKey: string;
}
const MemoTable = ({ searchKey }: IProps) => {
  const { data: memoList, isLoading: isLoadingSearchMemoList } = useSearchMemoList(searchKey);

  const router = useRouter();

  const handleClickRow = (date: string) => {
    console.log(date);
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell sx={{ width: '20%' }} align='left'>
            날짜
          </StyledTableCell>
          <StyledTableCell sx={{ width: '80%' }} align='left'>
            내용
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {memoList.content.length > 0 ? (
          <>
            {memoList.content.map((memo) => (
              <TableRow key={memo.id} onClick={() => handleClickRow(memo.date)}>
                <StyledTableCell align='left'>{memo.date}</StyledTableCell>
                <StyledTableCell align='left'>{memo.content}</StyledTableCell>
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
