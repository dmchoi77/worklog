import { forwardRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../button/Button';
import { GlobalPortal } from '~/GlobalPortal';
import { useDialogStore } from '~/shared/stores/useDialogStore';

interface DialogProps {
  cnacelText?: string;
  confirmText?: string;
  mainText?: string | string[];
  title?: string;
}

const Dialog = forwardRef<HTMLDivElement, DialogProps>((_, ref) => {
  const { cancelText, confirmText, mainText, open, title, updateDialogState, handleConfirm } = useDialogStore();

  return (
    <GlobalPortal.Consumer>
      <div
        ref={ref}
        className='w-full h-full p-[20px] absolute top-0 bg-black bg-opacity-70 flex justify-center items-center'
      >
        <div className='w-[400px] bg-white box-border rounded-[15px]'>
          <div className='h-[50px] flex justify-between items-center bg-[#3b3b3b] rounded-t-[12px] p-[0_15px]'>
            <span className='text-white font-[400] text-[18px]'>{title}</span>
            <button onClick={() => updateDialogState({ open: false })} className='font-[600] text-white'>
              <CloseIcon />
            </button>
          </div>
          <div className='flex flex-col justify-between h-full p-[0_10px_10px_10px]'>
            <p className='p-[10px_0px]'>
              {Array.isArray(mainText) ? <div>{mainText?.map((text) => <ul key={text}>{text}</ul>)}</div> : mainText}
            </p>
            <div className='flex gap-[10px]'>
              {cancelText && <Button onClick={() => updateDialogState({ open: !open })} label={confirmText} />}
              <Button
                label={confirmText}
                fullWidth
                onClick={() => {
                  updateDialogState({ open: !open });
                  handleConfirm?.();
                }}
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
