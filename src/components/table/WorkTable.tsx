import { useRouter } from 'next/router';

import { useEffect, useRef } from 'react';

import dayjs from 'dayjs';

import { Table, TableHead, TableRow, TableBody } from '@mui/material';

import { StyledTableCell } from './table.style';

import { useSearchWorkList } from '~/queries/work';

import { RoutePath } from '~/constants';
import { IWork } from '~/types';

interface IProps {
  searchKey: string;
}

const WorkTable = ({ searchKey }: IProps) => {
  // const [isDragging, setIsDragging] = useState(false);
  // const [startRowIndex, setStartRowIndex] = useState<number | null>(null);
  // const [selectedRows, setSelectedRows] = useState(new Set());
  // const [initialSelectedState, setInitialSelectedState] = useState(new Set());

  const { data: workList, isLoading: isLoadingSearchWorkList } = useSearchWorkList(searchKey);

  const router = useRouter();

  const handleClickRow = (work: IWork) => () => {
    const formattedDate = dayjs(work.date).format('YYYY/MM/DD');
    router.push({
      pathname: `${RoutePath.Content}/${formattedDate}`,
      query: { selected: work.id },
    });
  };

  const tableRowRef = useRef<HTMLTableRowElement[]>([]);

  // const handleMouseDown = (index: number) => (e) => {
  //   setIsDragging(true);
  //   setStartRowIndex(index);
  //   // 마우스 눌리는 순간의 이전 selectedRow 저장
  //   setInitialSelectedState(new Set(selectedRows));

  //   e.preventDefault();
  // };

  // const handleMouseEnter = (index: number) => () => {
  //   if (isDragging && startRowIndex !== null) {
  //     const endRowIndex = index;
  //     const start = Math.min(startRowIndex, endRowIndex);
  //     const end = Math.max(startRowIndex, endRowIndex);
  //     const newSelectedRows = new Set(selectedRows);

  //     for (let i = start; i <= end; i++) {
  //       // 마우스 눌리는 순간(드래그 시작된 순간의 상태를 기준으로 update)
  //       if (initialSelectedState.has(i)) {
  //         newSelectedRows.delete(i);
  //       } else {
  //         newSelectedRows.add(i);
  //       }
  //     }

  //     setSelectedRows(newSelectedRows);
  //   }
  // };

  // const handleRowMouseUp = (index: number) => () => {
  //   console.log('mouseUp');
  //   if (isDragging && startRowIndex !== null) {
  //     const endRowIndex = index;
  //     const start = Math.min(startRowIndex, endRowIndex);
  //     const end = Math.max(startRowIndex, endRowIndex);

  //     const newSelectedRows = new Set(selectedRows);

  //     for (let i = start; i <= end; i++) {
  //       // 마우스 눌리는 순간(드래그 시작된 순간의 상태를 기준으로 update)
  //       if (initialSelectedState.has(i)) {
  //         newSelectedRows.delete(i);
  //       } else {
  //         newSelectedRows.add(i);
  //       }
  //     }

  //     setSelectedRows(newSelectedRows);
  //     setIsDragging(false);
  //     setStartRowIndex(null);
  //   }
  // };

  // useEffect(() => {
  //   const handleMouseUp = () => {
  //     setIsDragging(false);
  //     setStartRowIndex(null);
  //     setInitialSelectedState(new Set());
  //   };

  //   document.addEventListener('mouseup', handleMouseUp);
  //   return () => {
  //     document.removeEventListener('mouseup', handleMouseUp);
  //   };
  // }, []);

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ height: '32px', fontSize: '10px' }}>
          {/* <StyledTableCell colSpan={1} align='left'>
            선택
          </StyledTableCell> */}
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
                onClick={handleClickRow(work)}
                // onMouseDown={handleMouseDown(index)}
                // onMouseEnter={handleMouseEnter(index)}
                // onMouseUp={handleRowMouseUp(index)}
              >
                {/* <StyledTableCell colSpan={1}>
                  <Checkbox checked={selectedRows.has(index)} />
                </StyledTableCell> */}
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
                  <span
                    style={{
                      fontSize: '10px',
                    }}
                  >
                    {work.category}
                  </span>
                </StyledTableCell>
                <StyledTableCell colSpan={1} align='center'>
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
