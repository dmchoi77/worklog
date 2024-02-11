import { useRouter } from 'next/navigation';

import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { IMemo } from '~/types/apis/memo.types';

interface IProps {
  memoList: Array<IMemo>;
}
const MemoTable = ({ memoList }: IProps) => {
  const router = useRouter();

  const handleClickRow = (date: string) => {
    console.log(date);
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align='center'>날짜</TableCell>
          <TableCell align='center'>내용</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {memoList.length > 0 ? (
          <>
            {memoList?.map((memo) => (
              <TableRow key={memo.id} onClick={() => handleClickRow(memo.date)}>
                <TableCell align='center'>{memo.date}</TableCell>
                <TableCell align='center'>{memo.content}</TableCell>
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
            <TableCell align='center' colSpan={10}>
              조회된 데이터가 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MemoTable;
