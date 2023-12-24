import { useCallback, useState } from 'react';

import { Button, Divider, Paper, TextField } from '@mui/material';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import styled from '@emotion/styled';

import SplitButton from '~/components/button/SplitButton';
import WorkList from '~/components/list/WorkList';

import { IData, exampleTasks } from '~/example-data';

const Container = styled.div`
  padding-top: 15;
  height: 100%;
`;
const TodayWork = () => {
  const [data, setData] = useState<IData>(exampleTasks);
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      // 리스트 밖으로 drop되면 destination이 null
      if (!destination) return;
      // 출발지와 목적지가 같으면 할게 없다
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      // 출발지의 column 얻기
      const column = data.columns[source.droppableId];

      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newData);
    },
    [data],
  );
  return (
    <div>
      <h3>WORK</h3>
      <Paper
        elevation={1}
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
          backgroundColor: '#dbdbdb42',
          padding: 10,
          marginTop: 20,
          marginBottom: 20,
          width: '100%',
          height: '150px',
          borderRadius: 10,
        }}
      >
        <textarea
          // value={input}
          // onChange={handleInput}
          autoFocus
          style={{
            width: '100%',
            height: '120px',
            fontSize: '15px',
            resize: 'none',
            padding: 10,
            borderRadius: 8,
            border: '1px solid rgb(153 153 153 / 38%)',
          }}
        />
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            width: '180px',
          }}
        >
          <SplitButton />
          <Button
            sx={{
              height: '30px',
              '.MuiButtonGroup-firstButton': {
                width: '60px',
                textAlign: 'left',
                justifyContent: 'flex-start',
                padding: 1,
              },
              '.MuiButtonGroup-lastButton': {
                width: '12px',
                minWidth: '12px',
              },
            }}
            variant='contained'
          >
            저장하기
          </Button>
        </div>
      </Paper>

      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column?.taskIds.map((taskId) => data.tasks[taskId]);
            return <WorkList column={column} tasks={tasks} key={column?.id} />;
          })}
        </Container>
      </DragDropContext>
    </div>
  );
};

export default TodayWork;
