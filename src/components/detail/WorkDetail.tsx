import { useRef, useState } from 'react';

import { Button, Checkbox } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ContentEditable from 'react-contenteditable';

import SplitButton from '../button/SplitButton';

import { useUpdateWork } from '~/queries/work';
import { IWork } from '~/types/apis/work.types';

import { GlobalPortal } from '~/GlobalPortal';

interface IProps extends IWork {
  handleClose: () => void;
}
const WorkDetail = (props: IProps) => {
  const { handleClose, category, content, date, id, title, order, state, deadline } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const [complete, updateComplete] = useState(state.toLocaleLowerCase() === 'completed' ? true : false);
  const { mutate } = useUpdateWork();
  const handleOnClickUpdate = () => mutate({ ...props, state: complete ? 'completed' : 'in_progress' });
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
      >
        <div
          css={{
            width: 800,
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
              // background: '#303030',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>
              ID: {id} / {date}
            </span>
            <CloseIcon onClick={handleClose} fontSize='medium' style={{ color: '#000', cursor: 'pointer' }} />
          </div>
          <div css={{ display: 'flex', padding: 16, paddingTop: 0, gap: 10 }}>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                flex: 0.7,
                gap: 20,
                overflowY: 'hidden',
              }}
            >
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <ContentEditable
                  css={{
                    height: '40px',
                    borderRadius: 2,
                    fontSize: 26,
                    fontWeight: 600,
                    overflowY: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      background: 'rgb(0 0 0 / 5%)',
                    },
                    padding: 5,
                  }}
                  innerRef={titleRef}
                  html={title}
                  disabled={false}
                  onChange={() => {}}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      contentRef?.current?.blur();
                    }
                  }}
                />
              </div>
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <span css={{ fontWeight: 500 }}>상세 내용</span>
                <ContentEditable
                  css={{
                    height: '150px',
                    borderRadius: 2,

                    overflowY: 'hidden',
                    '&:hover': {
                      background: 'rgb(0 0 0 / 5%)',
                    },
                    padding: 10,
                  }}
                  innerRef={contentRef}
                  html={content}
                  disabled={false}
                  onChange={() => {}}
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
                gap: 18,
                flexDirection: 'column',
                fontSize: 14,
                border: '1px solid #0000002e',
                borderRadius: 6,
                padding: 10,
              }}
            >
              <span>생성날짜: {date}</span>
              <span>마감기한: {deadline ?? ''}</span>
              <div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>카테고리: </span>
                <SplitButton
                  defaultOption={category}
                  options={['update', 'refactor', 'chore', 'feat']}
                  onSelectOption={() => {}}
                />
              </div>
              <div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div css={{ display: 'flex', alignItems: 'center' }}>
                  <span>완료여부: </span>
                  <Checkbox checked={complete} onChange={() => updateComplete((prev) => !prev)} />
                </div>
              </div>
              <div
                css={{
                  display: 'flex',
                  gap: 5,
                }}
              >
                <Button variant='contained' size='small' onClick={handleOnClickUpdate}>
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
