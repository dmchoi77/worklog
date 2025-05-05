'use client';
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Work, WorkCategoryOptions } from '../api';
import { WorkStatusButton } from './WorkStatusButton';
import { Container } from '~/shared/ui/container/card.style';

interface WorkCardProps {
  work: Work;
  onCategoryChange?: (value: string) => void;
  onStateToggle?: () => void;
  onDelete?: () => void;
  onDoubleClick?: () => void;
}

export const WorkCard = ({ work, onCategoryChange, onStateToggle, onDelete, onDoubleClick }: WorkCardProps) => (
  <Container bgColor='lightblue' onDoubleClick={onDoubleClick}>
    <div className='flex items-center gap-x-[8px] text-ellipsis overflow-hidden'>
      <div className='m-[4px]'>
        <WorkStatusButton
          defaultOption={work.category}
          options={WorkCategoryOptions}
          onSelectOption={onCategoryChange}
        />
      </div>
      <div className='overflow-auto'>
        <span>{work.title}</span>
      </div>
    </div>
    <div className='flex items-center'>
      <Checkbox checked={work.state === 'COMPLETED'} onChange={onStateToggle} />
      <DeleteIcon className='rounded-[6px] bg-[#ffffff]' onClick={onDelete} />
    </div>
  </Container>
);
