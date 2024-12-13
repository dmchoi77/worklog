'use client';
import { List } from './CommonList';
import WorkCard from '../card/WorkCard';
import { useFetchWorkList } from '~/queries/work';

interface IProps {
  targetDate: string;
}

export default function WorkList({ targetDate }: IProps) {
  const { data: workList } = useFetchWorkList({ date: targetDate });

  return <List>{workList?.map((work, index) => <WorkCard key={work?.id} {...work} index={index} />)}</List>;
}
