import { forwardRef } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import { Button } from '../button/Button';

import { useDialogStore } from '~/stores/useDialogStore';

import { GlobalPortal } from '~/GlobalPortal';

const Dialog = forwardRef<HTMLDivElement>((_, ref) => {
  const { cancelText, confirmText, mainText, open, title, updateDialogState, handleConfirm } = useDialogStore();

  return (
    <GlobalPortal.Consumer>
      <div
        ref={ref}
        className='w-full h-full p-[20px] absolute top-0 bg-black bg-opacity-70 flex justify-center items-center'
      >
        <div className='w-[400px] bg-white box-border rounded-[15px]'>
          <div className='h-[50px] flex justify-between items-center bg-[#3b3b3b] rounded-t-[12px] p-[0_15px]'>
            <span css={{ fontWeight: 400, color: '#fff', fontSize: 18 }}>{title}</span>
            <button onClick={() => updateDialogState({ open: false })} className='font-[600] text-white'>
              <CloseIcon />
            </button>
          </div>
          <div className='flex flex-col justify-between h-[100px] p-[10px] pt-0'>
            <p className='p-[10px_0px]'>
              {Array.isArray(mainText) ? <div>{mainText?.map((text) => <ul key={text}>{text}</ul>)}</div> : mainText}
            </p>
            <div className='flex gap-[10px]'>
              {cancelText && <Button onClick={() => updateDialogState({ open: !open })}>{confirmText}</Button>}
              <Button
                fullWidth
                onClick={() => {
                  updateDialogState({ open: !open });
                  handleConfirm?.();
                }}
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </GlobalPortal.Consumer>
  );
});

Dialog.displayName = 'Dialog';
export default Dialog;
