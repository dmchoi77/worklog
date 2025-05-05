import { PropsWithChildren } from 'react';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { useAlertDialogStore } from '~/shared/stores/useAlertDialogStore';

interface AlertDialogProps {
  title: string;
  description: string;
  cancelText?: string;
  actionText: string;
  onConfirm?: () => void;
}
export const AlertDialog = ({
  actionText = 'Confirm',
  cancelText,
  description,
  title,
  onConfirm,
}: PropsWithChildren<AlertDialogProps>) => {
  const { closeDialog } = useAlertDialogStore();

  const handleConfirm = () => {
    (onConfirm ?? closeDialog)();
  };
  return (
    <RadixAlertDialog.Root open>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className='fixed inset-0 data-[state=open]:animate-overlayShow bg-slate-900 opacity-50' />
        <RadixAlertDialog.Content className='fixed left-1/2 top-1/2 max-h-[85vh] w-[100vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
          <RadixAlertDialog.Title className='m-0 text-[18px] font-medium p-[20px]'>{title}</RadixAlertDialog.Title>
          <RadixAlertDialog.Description className='p-[20px] text-[15px] leading-normal'>
            {description}
          </RadixAlertDialog.Description>
          <div className='flex'>
            {cancelText && (
              <RadixAlertDialog.Cancel asChild>
                <button className='flex flex-1 items-center justify-start p-[20px] bg-[#393939] h-[60px] focus:shadow-[0_0_0_2px]'>
                  <span className='font-medium text-white text-left'>{cancelText}</span>
                </button>
              </RadixAlertDialog.Cancel>
            )}
            <RadixAlertDialog.Action asChild>
              <button
                onClick={handleConfirm}
                className='flex flex-1 items-center justify-start p-[20px] bg-blue-700 h-[60px] focus:shadow-[0_0_0_2px]'
              >
                <span className='font-medium text-white text-left'>{actionText}</span>
              </button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};
