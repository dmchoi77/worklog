'use client';
import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Checkbox, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentEditable from 'react-contenteditable';
import { useWorkMutation } from '../model';
import { GlobalPortal } from '~/app/GlobalPortal';
import { Work } from '~/entities/work/api';
import { workQueryKeys } from '~/entities/work/model/queries';
import { WorkStatusButton } from '~/entities/work/ui';
import useWork from '~/shared/hooks/useWork';
import { useSnackbarStore } from '~/shared/stores/useSnackbarStore';

interface WorkDetailProps extends Work {
  handleClose: () => void;
}

export const WorkDetail = ({ handleClose, ...workProps }: WorkDetailProps) => {
  const contentRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { updateWork } = useWorkMutation();
  const { work, workSetter } = useWork(workProps);

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const handleClickUpdate = () => {
    if (Object.entries(workProps).toString() === Object.entries(work).toString()) {
      handleClose();
      return updateSnackbarState({
        open: true,
        horizontal: 'center',
        message: '변경 사항이 없습니다.',
        vertical: 'bottom',
      });
    }

    updateWork(work, {
      onSuccess: (data) => {
        handleClose();
        queryClient.invalidateQueries(workQueryKeys.fetchWorkList({}));
        updateSnackbarState({
          open: true,
          horizontal: 'center',
          message: data?.message,
          vertical: 'bottom',
        });
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      contentRef?.current?.blur();
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const isCompleted = work.state.toLowerCase() === 'completed';

  return (
    <GlobalPortal.Consumer>
      <div
        className='flex items-center z-[100] absolute top-0 bg-[#0000007a] w-full h-full'
        onClick={handleBackgroundClick}
      >
        <div className='w-[800px] bg-white m-auto rounded-[10px] shadow-[3px 5px 17px 0px #555555]'>
          <div className='flex items-center justify-between p-[14px] bg-[#303030cd] rounded-t-[10px] h-[50px]'>
            <span className='font-[500] text-[18px] text-white'>업무 상세</span>
            <button onClick={handleClose}>
              <CloseIcon style={{ color: 'white' }} />
            </button>
          </div>
          <div className='flex p-[16px] gap-[10px]'>
            <div className='flex flex-col gap-y-[20px] flex-[0.7] justify-between overflow-y-hidden'>
              <input
                className='border-none h-[40px] rounded-[4px] text-[26px] m-1 font-semibold overflow-y-hidden flex items-center hover:bg-gray-200 outline-[#303030cd]'
                value={work.title}
                onChange={(e) => workSetter('title')(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>상세 내용</span>
                <ContentEditable
                  className='whitespace-break-spaces break-all h-[150px] border rounded-[4px] border-gray-300 overflow-y-hidden p-[10px] outline-[#303030cd] hover:bg-gray-200'
                  key='content'
                  innerRef={contentRef}
                  html={work.content}
                  disabled={false}
                  onChange={(e) => workSetter('content')(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className='flex flex-col justify-between gap-4 flex-[0.3] text-sm border border-[#0000002e] rounded p-2.5'>
              <div className='flex gap-4'>
                <span className='font-semibold'>생성날짜</span>
                <span>{work.date}</span>
              </div>
              <div className='flex gap-4'>
                <span className='font-semibold'>마감기한</span>
                <span>{work.deadline ?? ''}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-semibold'>카테고리</span>
                <WorkStatusButton
                  defaultOption={work.category}
                  options={['UPDATE', 'CHORE', 'FEAT', 'REFACTOR']}
                  onSelectOption={workSetter('category')}
                />
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-semibold'>완료여부</span>
                <Checkbox
                  name='state'
                  checked={isCompleted}
                  onChange={() => {
                    workSetter('state')(isCompleted ? 'in_progress' : 'completed');
                  }}
                />
              </div>
              <Button variant='contained' size='small' onClick={handleClickUpdate} className='w-full'>
                업데이트
              </Button>
            </div>
          </div>
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
};
