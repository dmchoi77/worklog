export interface IData {
  tasks: {
    [key: string]: { id: string; content: string };
  };
  columns: {
    [key: string]: { id: string; title: string; taskIds: string[] };
  };
  columnOrder: string[];
}

export const exampleTasks = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Studying React Native Navigation' },
    'task-2': { id: 'task-2', content: 'Spring AutoWired' },
    'task-3': { id: 'task-3', content: 'Text Compression in Shop react app' },
    'task-4': { id: 'task-4', content: 'modifying part time insurance webView ' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'work',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
  },
  columnOrder: ['column-1'],
};

export const exampleMemos = {
  tasks: {
    '1': {
      id: '1',
      content:
        '가나다라마바사아자차카타파하 스벨트스벨트스벨트 길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게',
    },
    '5': { id: '5', content: '키보드 마우스 청소청소청소' },
    '2': {
      id: '2',
      content:
        '메모 길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게길게',
    },
    '3': { id: '3', content: '비어있음' },
  },
  columns: {
    '3': {
      id: '3',
      title: 'memo',
      taskIds: ['1', '5', '2', '3'],
    },
  },
  columnOrder: ['3'],
};
