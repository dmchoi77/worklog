import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { StyledTableCell } from './table.style';

import { useSearchWorkList } from '~/queries/work';

interface IProps {
  searchKey: string;
}

const WorkTable = ({ searchKey }: IProps) => {
  const { data: workList, isLoading: isLoadingSearchWorkList } = useSearchWorkList(searchKey);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell colSpan={1} align='left'>
            날짜
          </StyledTableCell>
          <StyledTableCell colSpan={1} align='left'>
            마감일자
          </StyledTableCell>
          <StyledTableCell colSpan={3} align='left'>
            제목
          </StyledTableCell>
          <StyledTableCell colSpan={1} align='left'>
            내용
          </StyledTableCell>
          <StyledTableCell colSpan={1} align='left'>
            카테고리
          </StyledTableCell>
          <StyledTableCell colSpan={1} align='left' title='상태'>
            상태
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {workList.content.length > 0 ? (
          <>
            {workList.content.map((work) => (
              <TableRow key={work.id}>
                <StyledTableCell colSpan={1}>{work.date}</StyledTableCell>
                <StyledTableCell colSpan={1} align='left'>
                  {work.deadline}
                </StyledTableCell>
                <StyledTableCell colSpan={3} align='left'>
                  {work.title}
                </StyledTableCell>
                <StyledTableCell colSpan={1} align='left'>
                  {work.content}
                </StyledTableCell>
                <StyledTableCell colSpan={1} align='left'>
                  {work.category}
                </StyledTableCell>
                <StyledTableCell colSpan={1} align='left'>
                  {work.state === 'COMPLETED' ? '완료' : '진행 중'}
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

export default WorkTable;

// const SkeletonUI = () => {
//   return (
//     <Stack spacing={-1} padding={1}>
//       {new Array(8).fill('').map((item, index) => (
//         <Skeleton key={index} variant='text' animation='wave' width='100%' height={50} />
//       ))}
//     </Stack>
//   );
// };
