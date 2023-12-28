import { useCallback, useState } from 'react';

import { Button, Divider, Paper, TextField } from '@mui/material';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import styled from '@emotion/styled';

import WorkForm from '../form/WorkForm';

import SplitButton from '~/components/button/SplitButton';
import WorkList from '~/components/list/WorkList';

import { IData, exampleTasks } from '~/example-data';

const Container = styled.div`
  padding-top: 15;
  height: 100%;
`;

interface IProps {
  targetDate: string;
}

const TodayWork = ({ targetDate }: IProps) => {
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
      <WorkForm targetDate={targetDate} />
      <WorkList targetDate={targetDate} />
    </div>
  );
};

export default TodayWork;
