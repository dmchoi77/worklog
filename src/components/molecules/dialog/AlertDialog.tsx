import { PropsWithChildren } from 'react';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { useAlertDialogStore } from '~/stores/useAlertDialogStore';

interface AlertDialogProps {
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
  onConfirm?: () => void;
}
export const AlertDialog = ({
  actionText,
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
        <RadixAlertDialog.Overlay className='fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow' />
        <RadixAlertDialog.Content className='fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
          <RadixAlertDialog.Title className='m-0 text-[17px] font-medium text-mauve12'>{title}</RadixAlertDialog.Title>
          <RadixAlertDialog.Description className='mb-5 mt-[15px] text-[15px] leading-normal text-mauve11'>
            {description}
          </RadixAlertDialog.Description>
          <div className='flex justify-end gap-[25px]'>
            {cancelText && (
              <RadixAlertDialog.Cancel asChild>
                <button className='inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none hover:bg-mauve5 focus:shadow-[0_0_0_2px] focus:shadow-mauve7'>
                  {cancelText}
                </button>
              </RadixAlertDialog.Cancel>
            )}
            <RadixAlertDialog.Action asChild>
              <button
                onClick={handleConfirm}
                className='inline-flex h-[35px] items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none hover:bg-red5 focus:shadow-[0_0_0_2px] focus:shadow-red7'
              >
                {actionText}
              </button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};
