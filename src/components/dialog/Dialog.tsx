import { forwardRef } from 'react';
import Button from '../button/Button';
import { GlobalPortal } from '~/GlobalPortal';
import { useDialogStore } from '~/stores/useDialogStore';

const Dialog = forwardRef<HTMLDivElement>((_, ref) => {
  const { cancelText, confirmText, mainText, open, title, updateDialogState, handleConfirm } =
    useDialogStore();

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
            width: '400px',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            borderRadius: '15px',
          }}
        >
          <div
            css={{
              height: '50px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#3b3b3b',
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
              padding: '0 15px',
            }}
          >
            <span css={{ fontWeight: 800, color: '#fff', fontSize: 20 }}>{title}</span>
            <div
              onClick={() => updateDialogState({ open: !open })}
              css={{ cursor: 'pointer', fontWeight: 600, color: '#fff' }}
            >
              X
            </div>
          </div>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '100px',
              height: '100%',
              padding: 10,
              paddingTop: 0,
            }}
          >
            <div css={{ padding: '10px 0' }}>
              {Array.isArray(mainText) ? (
                <div>
                  {mainText?.map((text) => (
                    <ul key={text}>{text}</ul>
                  ))}
                </div>
              ) : (
                mainText
              )}
            </div>
            <div
              css={{
                display: 'flex',
                gap: '10px',
              }}
            >
              {cancelText && <Button text={cancelText} onClick={() => updateDialogState({ open: !open })} />}
              <Button
                text={confirmText}
                onClick={() => {
                  updateDialogState({ open: !open });
                  handleConfirm?.();
                }}
                style={{}}
              />
            </div>
          </div>
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
});

Dialog.displayName = 'Dialog';
export default Dialog;
