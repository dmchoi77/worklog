import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Checkbox, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentEditable from 'react-contenteditable';
import { WorkStatusButton } from './WorkStatusButton';
import { useUpdateWork, workQueryKeys } from '../../api/work/queries';
import { Work } from '../../model';
import { GlobalPortal } from '~/app/GlobalPortal';
import useMobile from '~/shared/hooks/useMobile';
import useWork from '~/shared/hooks/useWork';
import { useSnackbarStore } from '~/shared/stores/useSnackbarStore';

interface WorkDetailProps extends Work {
  handleClose: () => void;
}
const WorkDetail = (props: WorkDetailProps) => {
  const { handleClose } = props;

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { mutate } = useUpdateWork();
  const { work, workSetter } = useWork(props);

  const mobile = useMobile();

  const updateSnackbarState = useSnackbarStore((state) => state.updateSnackbarState);

  const handleClickUpdate = () => {
    if (Object.entries(props).toString() === Object.entries(work).toString()) {
      handleClose();
      return updateSnackbarState({
        open: true,
        horizontal: 'center',
        message: '변경 사항이 없습니다.',
        vertical: 'bottom',
      });
    }

    mutate(work, {
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

  return (
    <GlobalPortal.Consumer>
      <div
        className='flex items-center z-[100] absolute top-0 bg-[#0000007a] w-full h-full'
        onClick={(e) => {
          e.target === e.currentTarget && handleClose();
        }}
      >
        <div className='w-[800px] bg-white m-auto rounded-[10px] shadow-[3px 5px 17px 0px #555555]'>
          <div className='flex items-center justify-between p-[14px] bg-[#303030cd] rounded-t-[10px] h-[50px]'>
            <span className='font-[500] text-[18px] text-white'>업무 상세</span>
            <button onClick={handleClose}>
              <CloseIcon onClick={handleClose} style={{ color: 'white' }} />
            </button>
          </div>
          <div className='flex p-[16px] gap-[10px]'>
            <div className='flex flex-col gap-y-[20px] flex-[0.7] justify-between overflow-y-hidden'>
              <input
                className='border-none h-[40px] rounded-[4px] text-[26px] m-1 font-semibold overflow-y-hidden flex items-center hover:bg-gray-200 outline-[#303030cd]'
                value={work.title}
                onChange={(e) => {
                  workSetter('title')(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    contentRef?.current?.blur();
                  }
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontWeight: 500 }}>상세 내용</span>
                <ContentEditable
                  className='whitespace-break-spaces break-all h-[150px] border rounded-[4px] border-gray-300 overflow-y-hidden p-[10px] outline-[#303030cd] hover:bg-gray-200'
                  key='content'
                  innerRef={contentRef}
                  html={work.content}
                  disabled={false}
                  onChange={(e) => {
                    workSetter('content')(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      contentRef?.current?.blur();
                    }
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flex: 0.3,
                justifyContent: 'space-between',
                gap: mobile ? 5 : 18,
                flexDirection: 'column',
                fontSize: 14,
                border: '1px solid #0000002e',
                borderRadius: 4,
                padding: 10,
              }}
            >
              <div style={{ display: 'flex', gap: 15 }}>
                <span className='font-[600]'>생성날짜</span>
                <span>{work.date}</span>
              </div>
              <div style={{ display: 'flex', gap: 15 }}>
                <span className='font-[600]'>마감기한</span>
                <span>{work.deadline ?? ''}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <span className='font-[600]'>카테고리</span>
                <WorkStatusButton
                  defaultOption={work.category}
                  options={['UPDATE', 'CHORE', 'FEAT', 'UPDATE']}
                  onSelectOption={workSetter('category')}
                />
              </div>
              <div className='flex items-center gap-x-[15px]'>
                <span className='font-[600]'>완료여부</span>
                <Checkbox
                  name='state'
                  checked={work.state.toLocaleLowerCase() === 'completed' ? true : false}
                  onChange={() => {
                    workSetter('state')(work.state.toLocaleLowerCase() === 'completed' ? 'in_progress' : 'completed');
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

export default WorkDetail;
