import { forwardRef } from 'react';
import Button from '../button/Button';
import { GlobalPortal } from '~/GlobalPortal';
import { useRecoilValue } from 'recoil';
import { dialogState } from '~/store/dialog/dialog';

const Dialog = forwardRef<HTMLDivElement>((_, ref) => {
  const { mainText, title, cancelText, confirmText, handleClose, handleConfirm } =
    useRecoilValue(dialogState);
  return (
    <GlobalPortal.Consumer>
      <div
        ref={ref}
        css={{
          width: '100%',
          height: '100%',
          padding: '20px',
          position: 'absolute',
          top: 0,
          backgroundColor: '#0000007a',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          css={{
            width: '300px',
            height: '300px',
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            padding: '13px',
            boxSizing: 'border-box',
          }}
        >
          <div
            css={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div css={{ fontWeight: 600 }}>{title}</div>
            <div onClick={handleClose} css={{ cursor: 'pointer', fontWeight: 600 }}>
              X
            </div>
          </div>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <div
              css={{
                height: '220px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              {mainText}
            </div>
            <div
              css={{
                display: 'flex',
                gap: '10px',
              }}
            >
              {cancelText && <Button text={cancelText} onClick={handleClose} />}
              <Button text={confirmText} onClick={handleConfirm} />
            </div>
          </div>
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
});

Dialog.displayName = 'Dialog';
export default Dialog;
