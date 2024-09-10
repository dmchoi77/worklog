import { GetServerSideProps } from 'next';

import { Divider } from '@mui/material';

import MemoTable from '~/components/organisms/table/MemoTable';
import WorkTable from '~/components/organisms/table/WorkTable';

interface IProps {
  searchKey: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const key = ctx.query.key;
  return {
    props: { searchKey: key },
  };
};

const Search = ({ searchKey }: IProps) => (
  <div className='w-full'>
    <div className='bg-[rgb(242, 242, 242)] flex-1 w-full overflow-y-scroll h-[calc(100vh-50px)] flex flex-col'>
      <div className='flex flex-col p-[14px] gap-[14px]'>
        <div className='today-task-container'>
          <div className='font-[600]'>통합 검색</div>
        </div>
        <div>
          <p className='p-[6px] font-[500]'>Work</p>
          <div className='bg-white flex flex-col'>
            <Divider />
            <WorkTable searchKey={searchKey} />
          </div>
        </div>
        <div>
          <p className='p-[6px] font-[500]'>Memo</p>
          <div className='bg-white flex flex-col'>
            <Divider />
            <MemoTable searchKey={searchKey} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Search;
