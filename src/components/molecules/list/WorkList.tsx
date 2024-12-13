'use client';
import WorkCard from '../card/WorkCard';
import { useFetchWorkList } from '~/queries/work';

interface IProps {
  targetDate: string;
}

export default function WorkList({ targetDate }: IProps) {
  const { data: workList = [] } = useFetchWorkList({ date: targetDate });

  return (
    <div>
      {workList.map((work, index) => (
        <WorkCard key={work?.id} {...work} index={index} />
      ))}
    </div>
  );
}
