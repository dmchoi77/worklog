'use client';
import WorkCard from '../card/WorkCard';
import { useFetchWorkList } from '~/queries/work';
import { IWork } from '~/types';

interface IProps {
  targetDate: string;
  initialData: IWork[];
}

export default function WorkList({ targetDate, initialData }: IProps) {
  const { data: workList = [] } = useFetchWorkList({ date: targetDate }, initialData);

  return (
    <div className='overflow-auto'>
      {workList.map((work, index) => (
        <WorkCard key={work?.id} {...work} index={index} />
      ))}
    </div>
  );
}
