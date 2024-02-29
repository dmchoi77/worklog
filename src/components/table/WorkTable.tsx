import { Table, TableHead, TableRow, TableCell, TableBody, Skeleton, Stack } from '@mui/material';

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
          <TableCell colSpan={1} align='left'>
            날짜
          </TableCell>
          <TableCell colSpan={1} align='left'>
            마감일자
          </TableCell>
          <TableCell colSpan={3} align='left'>
            제목
          </TableCell>
          <TableCell colSpan={1} align='left'>
            내용
          </TableCell>
          <TableCell colSpan={1} align='left'>
            카테고리
          </TableCell>
          <TableCell colSpan={1} align='left'>
            상태
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {workList.content.length > 0 ? (
          <>
            {workList.content.map((work) => (
              <TableRow key={work.id}>
                <TableCell colSpan={1}>{work.date}</TableCell>
                <TableCell colSpan={1} align='left'>
                  {work.deadline}
                </TableCell>
                <TableCell colSpan={3} align='left'>
                  {work.title}
                </TableCell>
                <TableCell colSpan={1} align='left'>
                  {work.content}
                </TableCell>
                <TableCell colSpan={1} align='left'>
                  {work.category}
                </TableCell>
                <TableCell colSpan={1} align='left'>
                  {work.state}
                </TableCell>
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
