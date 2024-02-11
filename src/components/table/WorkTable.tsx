import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { IWork } from '~/types/apis/work.types';

interface IProps {
  workList: Array<IWork>;
}
const WorkTable = ({ workList }: IProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align='left'>날짜</TableCell>
          <TableCell align='left'>마감일자</TableCell>
          <TableCell align='left'>제목</TableCell>
          <TableCell align='left'>내용</TableCell>
          <TableCell align='left'>카테고리</TableCell>
          <TableCell align='left'>상태</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {workList.length > 0 ? (
          <>
            {workList?.map((work) => (
              <TableRow key={work.id}>
                <TableCell>{work.date}</TableCell>
                <TableCell align='left'>{work.deadline}</TableCell>
                <TableCell align='left'>{work.title}</TableCell>
                <TableCell align='left'>{work.content}</TableCell>
                <TableCell align='left'>{work.category}</TableCell>
                <TableCell align='left'>{work.state}</TableCell>
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
