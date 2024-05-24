import { useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { Button, Checkbox } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ContentEditable from 'react-contenteditable';

import SplitButton from '../button/SplitButton';

import useMobile from '~/hooks/useMobile';
import useWork from '~/hooks/useWork';
import { useUpdateWork, workQueryKeys } from '~/queries/work';
import { useSnackbarStore } from '~/stores/useSnackbarStore';
import { IWork } from '~/types/apis/work.types';

import { GlobalPortal } from '~/GlobalPortal';

interface IProps extends IWork {
  handleClose: () => void;
}
const WorkDetail = (props: IProps) => {
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
        className='popup-container'
        css={{
          display: 'flex',
          alignItems: 'center',
          zIndex: 100,
          top: 0,
          position: 'absolute',
          background: '#0000007a',
          width: '100%',
          height: '100%',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <div
          css={{
            width: mobile ? '80%' : 800,
            background: '#fff',
            margin: '0 auto',
            borderRadius: 10,
            boxShadow: '3px 5px 17px 0px #555555',
          }}
        >
          <div
            css={{
              padding: 14,
              position: 'relative',
              background: '#303030cd',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span css={{ fontWeight: 400, fontSize: 18, color: '#fff' }}>업무 상세</span>
            <CloseIcon onClick={handleClose} fontSize='medium' style={{ color: '#fff', cursor: 'pointer' }} />
          </div>
          <div
            css={{
              display: 'flex',
              padding: 16,
              gap: 10,
              flexDirection: mobile ? 'column' : 'row',
            }}
          >
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                flex: 0.7,
                gap: 20,
                justifyContent: 'space-between',
                overflowY: 'hidden',
              }}
            >
              <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input
                  css={{
                    border: 'none',
                    height: '40px',
                    borderRadius: 4,
                    fontSize: 26,
                    fontWeight: 600,
                    overflowY: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      background: 'rgb(0 0 0 / 5%)',
                    },
                    padding: 1,
                    outlineColor: '#303030cd',
                  }}
                  value={work.title}
                  onChange={(e) => workSetter('title')(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      contentRef?.current?.blur();
                    }
                  }}
                />
              </div>
              <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span css={{ fontWeight: 500 }}>상세 내용</span>
                <ContentEditable
                  css={{
                    height: '150px',
                    borderRadius: 4,
                    border: '1px solid rgb(0 0 0 / 15%)',
                    overflowY: 'hidden',
                    '&:hover': {
                      background: 'rgb(0 0 0 / 5%)',
                    },
                    padding: 10,
                    outlineColor: '#303030cd',
                  }}
                  key='content'
                  innerRef={contentRef}
                  html={work.content}
                  disabled={false}
                  onChange={(e) => workSetter('content')(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      contentRef?.current?.blur();
                    }
                  }}
                />
              </div>
            </div>

            <div
              css={{
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
              <div css={{ display: 'flex', gap: 15 }}>
                <span css={{ fontWeight: 600 }}>생성날짜</span>
                <span>{work.date}</span>
              </div>
              <div css={{ display: 'flex', gap: 15 }}>
                <span css={{ fontWeight: 600 }}>마감기한</span>
                <span>{work.deadline ?? ''}</span>
              </div>
              <div css={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <span css={{ fontWeight: 600 }}>카테고리</span>
                <SplitButton
                  defaultOption={work.category}
                  options={['update', 'refactor', 'chore', 'feat']}
                  onSelectOption={workSetter('category')}
                />
              </div>
              <div css={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <div css={{ display: 'flex', alignItems: 'center' }}>
                  <span css={{ fontWeight: 600 }}>완료여부</span>
                  <Checkbox
                    name='state'
                    checked={work.state.toLocaleLowerCase() === 'completed' ? true : false}
                    onChange={() => {
                      workSetter('state')(work.state.toLocaleLowerCase() === 'completed' ? 'in_progress' : 'completed');
                    }}
                  />
                </div>
              </div>
              <div css={{ display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
                <Button variant='contained' size='small' onClick={handleClickUpdate} css={{ width: '100%' }}>
                  업데이트
                </Button>
                {/* <Button variant='outlined' size='small'>
                  재등록
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
};

export default WorkDetail;
