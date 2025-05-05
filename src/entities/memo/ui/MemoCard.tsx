import { RefObject } from 'react';
import { Box, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { Container } from '~/shared/ui/container/card.style';

interface MemoCardProps {
  id: number;
  content: string;
  contentRef: RefObject<HTMLInputElement>;
  visibleBtn: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
  onChange: (e: ContentEditableEvent) => void;
}

export const MemoCard = ({
  id,
  contentRef,
  visibleBtn,
  onMouseEnter,
  onMouseLeave,
  onClickDelete,
  onClickEdit,
  onChange,
  content,
}: MemoCardProps) => {
  return (
    <Container bgColor='lightgreen' key={id} onMouseOver={onMouseEnter} onMouseOut={onMouseLeave}>
      {visibleBtn && (
        <Box className='flex absolute mr-3 right-0 rounded-md shadow-md'>
          <EditNoteIcon className='rounded-md bg-white' onClick={onClickEdit} />
          <Divider className='w-1 bg-gray-300' />
          <DeleteIcon className='rounded-md bg-white' onClick={onClickDelete} />
        </Box>
      )}
      <ContentEditable
        tagName='span'
        className='whitespace-break-spaces break-all'
        innerRef={contentRef}
        html={content}
        disabled={false}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Escape') contentRef?.current?.blur();
        }}
      />
    </Container>
  );
};
