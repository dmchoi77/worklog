'use client';
import { useRef } from 'react';
import dayjs from 'dayjs';
import { Table, TableHead, TableRow, TableBody } from '@mui/material';
import { StyledTableCell } from './table.style';
import { useSearchWorkList } from '~/queries/work';
import { RoutePath } from '~/constants';
import Link from 'next/link';

interface IProps {
  searchKey: string;
}

const WorkTable = ({ searchKey }: IProps) => {
  const { data: workList, isLoading: isLoadingSearchWorkList } = useSearchWorkList(searchKey);

  const tableRowRef = useRef<HTMLTableRowElement[]>([]);

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ height: '32px', fontSize: '10px' }}>
          <StyledTableCell colSpan={1} align='center'>
            번호
          </StyledTableCell>
          <StyledTableCell colSpan={1} align='center'>
            날짜
          </StyledTableCell>
          <StyledTableCell colSpan={1} align='center'>
            마감일자
          </StyledTableCell>
          <StyledTableCell colSpan={3} align='center'>
            제목
          </StyledTableCell>
          <StyledTableCell colSpan={1} align='center'>
            카테고리
          </StyledTableCell>
          <StyledTableCell colSpan={1} align='center'>
            상태
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {workList.content.length > 0 ? (
          <>
            {workList.content.map((work, index) => (
              <Link href={`${RoutePath.Content}/${dayjs(work.date).format('YYYY/MM/DD')}`}>
                <TableRow
                  className='draggable'
                  key={work.id}
                  ref={(el) => {
                    if (el !== null) tableRowRef.current[index] = el;
                  }}
                  sx={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    background: work.state === 'COMPLETED' ? 'lightblue' : 'pink',
                  }}
                >
                  <StyledTableCell colSpan={1} align='center'>
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell colSpan={1} align='center'>
                    {work.date}
                  </StyledTableCell>
                  <StyledTableCell colSpan={1} align='center'>
                    {work.deadline}
                  </StyledTableCell>
                  <StyledTableCell colSpan={3} align='center'>
                    {work.title}
                  </StyledTableCell>
                  <StyledTableCell colSpan={1} align='center'>
                    <span className='text-[10px]'>{work.category}</span>
                  </StyledTableCell>
                  <StyledTableCell colSpan={1} align='center'>
                    {work.state === 'COMPLETED' ? '완료' : '진행 중'}
                  </StyledTableCell>
                </TableRow>
              </Link>
            ))}
          </>
        ) : (
          <TableRow className='w-full text-center'>
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
