import { Button, Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import MemoList from '../list/MemoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { IData, exampleMemos } from '~/example-data';
import useInput from '~/hooks/useInput';
import { useAddMemo } from '~/queries/memo';
import dayjs from 'dayjs';

interface IProps {
  targetDate: string;
}
const TodayMemo = ({ targetDate }: IProps) => {
  const [data, setData] = useState<IData>(exampleMemos);

  const { input, handleInput, reset } = useInput();
  const { mutate } = useAddMemo();

  const handleAddMemo = () => {
    mutate(
      { content: input, date: targetDate },
      {
        onSuccess: () => reset(),
      },
    );
  };

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
      <h2>MEMO</h2>

      <Paper
        elevation={1}
        className='input-container'
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
          value={input}
          onChange={handleInput}
          style={{
            width: '100%',
            height: '120px',
            fontSize: '15px',
            resize: 'none',
            padding: 10,
            borderRadius: 8,
            border: 'none',
          }}
        />
        <div
          css={{
            display: 'flex',
            gap: 10,
          }}
        >
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
            onClick={handleAddMemo}
          >
            저장하기
          </Button>
        </div>
      </Paper>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column?.taskIds.map((taskId) => data.tasks[taskId]);
          return <MemoList column={column} tasks={tasks} key={column?.id} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default TodayMemo;
