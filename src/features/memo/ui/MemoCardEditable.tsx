'use client';
import { useMemoCardDetail } from '../model';
import { MemoCard } from '~/entities/memo/ui';

interface MemoCardEditableProps {
  content: string;
  id: number;
}

export const MemoCardEditable = ({ content, id }: MemoCardEditableProps) => {
  const { contentRef, visibleBtn, setVisibleBtn, handleOnChangeMemo, handleDeleteMemo, handleFocusContent } =
    useMemoCardDetail({ content, id });

  return (
    <MemoCard
      id={id}
      contentRef={contentRef}
      content={content}
      visibleBtn={visibleBtn}
      onMouseEnter={() => setVisibleBtn(true)}
      onMouseLeave={() => setVisibleBtn(false)}
      onClickDelete={handleDeleteMemo}
      onClickEdit={handleFocusContent}
      onChange={handleOnChangeMemo}
    />
  );
};
