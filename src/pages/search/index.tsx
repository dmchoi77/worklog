import { GetServerSideProps } from 'next';

import { Divider } from '@mui/material';

import { SearchTableContainer, SearchTableTitle } from './search.style';

import MemoTable from '~/components/table/MemoTable';
import WorkTable from '~/components/table/WorkTable';

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
            gap: 14,
          }}
        >
          <div className='today-task-container'>
            <div css={{ fontWeight: 600 }}>통합 검색</div>
          </div>
          <div>
            <SearchTableTitle>Work</SearchTableTitle>
            <SearchTableContainer>
              <Divider />
              <WorkTable searchKey={searchKey} />
            </SearchTableContainer>
          </div>
          <div>
            <SearchTableTitle>Memo</SearchTableTitle>
            <SearchTableContainer>
              <Divider />
              <MemoTable searchKey={searchKey} />
            </SearchTableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
