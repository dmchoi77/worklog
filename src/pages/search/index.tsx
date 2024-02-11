import { GetServerSideProps } from 'next';

import React from 'react';

import { Divider, Skeleton, Stack } from '@mui/material';

import { Work } from '@mui/icons-material';

import MemoTable from '~/components/table/MemoTable';
import WorkTable from '~/components/table/WorkTable';
import { useSearchMemoList } from '~/queries/memo';
import { useSearchWorkList } from '~/queries/work';

interface IProps {
  searchKey: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const key = ctx.query.key;
  return {
    props: { searchKey: key },
  };
};

const Search = ({ searchKey }: IProps) => {
  const { data: memoList, isLoading: isLoadingSearchMemoList } = useSearchMemoList(searchKey);
  const { data: workList, isLoading: isLoadingSearchWorkList } = useSearchWorkList(searchKey);

  return (
    <div css={{ width: '100%' }}>
      <div
        css={{
          backgroundColor: 'rgb(242, 242, 242)',
          flex: 1,
          width: '100%',
          overflowY: 'scroll',

          height: 'calc(100vh - 50px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            padding: 14,
            gap: 15,
          }}
        >
          <div className='today-task-container' css={{}}>
            <div css={{ fontWeight: 600 }}>통합 검색</div>
          </div>
          <div
            css={{
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div>
              <p css={{ padding: 12, fontWeight: 500 }}>Work</p>
              <Divider />
              {isLoadingSearchWorkList ? <SkeletonUI /> : <WorkTable workList={workList?.content} />}
            </div>
            <div>
              <p css={{ padding: 12, fontWeight: 500 }}>Memo</p>
              <Divider />
              {isLoadingSearchMemoList ? <SkeletonUI /> : <MemoTable memoList={memoList?.content} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

const SkeletonUI = () => {
  return (
    <Stack spacing={-1} padding={1}>
      {new Array(8).fill('').map((item, index) => (
        <Skeleton key={index} variant='text' animation='wave' width='100%' height={50} />
      ))}
    </Stack>
  );
};
